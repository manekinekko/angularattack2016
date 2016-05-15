import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {COLORS} from './colors-dictionary';
import {Levenshtein} from './algorithms';

import 'rxjs/add/operator/map';

export const FEATURE_TYPE = {
  'TYPE_UNSPECIFIED': 'TYPE_UNSPECIFIED',
  'FACE_DETECTION': 'FACE_DETECTION',
  'LANDMARK_DETECTION': 'LANDMARK_DETECTION',
  'LOGO_DETECTION': 'LOGO_DETECTION',
  'LABEL_DETECTION': 'LABEL_DETECTION',
  'TEXT_DETECTION': 'TEXT_DETECTION',
  'SAFE_SEARCH_DETECTION': 'SAFE_SEARCH_DETECTION',
  'IMAGE_PROPERTIES': 'IMAGE_PROPERTIES'
};

@Injectable()
export class Vision {

  private VISION_ENDPOINT = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAxtYY-XwspbDUGYF21aqSlFxTnI8EGzbw';

  constructor(private http: Http) {
  }

  process(base64: string, feature: string = FEATURE_TYPE.LABEL_DETECTION) {
    let request: any = {
      requests: [{
        image: {
          content: base64.replace(/data:image\/(jpeg|png);base64,/g, '')
        },
        features: [{
          type: feature,
          maxResults: 200
        }]
      }]
    };
    return this.post(request);
  }

  private post(request: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.VISION_ENDPOINT, JSON.stringify(request), headers)
      .map( res => res.json() )
      .map( res => this.processMetadata(res) );
  }

  private processMetadata(data: any): any[] | any {

    data.responses = data.responses || {};
    if(Array.isArray(data.responses)) {
      data.responses = data.responses.pop();
    }

    if(data.responses.labelAnnotations) {
      let labels = [];
      (data.responses.labelAnnotations || []).forEach( (lbl) => {
        labels.push(lbl.description);
      });
      return {labels};
    }

    if(data.responses.faceAnnotations) {
      let face = [];
      (data.responses.faceAnnotations || []).forEach( (expression) => {
        for(var exp in expression) {
          if( exp.indexOf('Likelihood') !== -1 ) {
            face.push(exp.replace('Likelihood', ''));
          }
        }
      });
      return {face};
    }

    if(data.responses.imagePropertiesAnnotation) {
      let color = data.responses
        .imagePropertiesAnnotation
        .dominantColors
        .colors
        .sort( (colorA, colorB) => colorA.score > colorB.score)
        .pop();

      let computedColor = this.rgbToHex(color.color.red, color.color.red, color.color.red);

      color = COLORS[
        Object
          .keys(COLORS)
          .map( (v, i, arr) => {
            return {'color':arr[i],'d':Levenshtein(arr[i], computedColor)}
          })
          .sort( (a,b) => a.d>b.d?-1:1 )
          .pop().color
      ];

      return {color};
    }

    if(data.responses.textAnnotations) {
      let text = (data.responses.textAnnotations || []).shift();
      return {text:[text.description]};
    }

    return [];
  }

  private rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

}
