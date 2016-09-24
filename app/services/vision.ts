import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {COLORS} from './colors-dictionary';

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

  constructor(private http: Http) {}

  /**
   * Process the user's query.
   * Available queries:
   * - LABEL_DETECTION  : for generic label extraction (default)
   * - FACE_DETECTION   : for facial expression
   * - TEXT_DETECTION   : for OCR text
   * - IMAGE_PROPERTIES : for dominant color extraction
   */
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

  /**
   * Send the request to the Google Vision API endpoint.
   */
  private post(request: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.VISION_ENDPOINT, JSON.stringify(request), headers)
      .map(res => res.json())
      .map(res => this.processMetadata(res));
  }

  /**
   * Process the response result from the Vision endpoint.
   */
  private processMetadata(data: any): any[] | any {

    data.responses = data.responses || {};
    if (Array.isArray(data.responses)) {
      data.responses = data.responses.pop();
    }

    if (data.responses.labelAnnotations) {
      let labels = [];
      (data.responses.labelAnnotations || []).forEach((lbl) => {
        labels.push(lbl.description);
      });
      return { labels };
    }

    if (data.responses.faceAnnotations) {
      let face = [];
      (data.responses.faceAnnotations || []).forEach((expression) => {
        for (var exp in expression) {
          if (exp.indexOf('Likelihood') !== -1) {
            face.push(exp.replace('Likelihood', ''));
          }
        }
      });
      return { face };
    }

    if (data.responses.imagePropertiesAnnotation) {
      let colorResponse = data.responses
        .imagePropertiesAnnotation
        .dominantColors
        .colors
        .sort((colorA, colorB) => colorA.score > colorB.score)
        .pop();
      let color: IRGBColor = colorResponse.color;
      return { color: this.findNearestColorName(color) };
    }

    if (data.responses.textAnnotations) {
      let text = (data.responses.textAnnotations || []).shift();
      return { text: [text.description] };
    }

    return [];
  }

  /**
   * Find the nearest color name based on the RGB color extracted from the image.
   */
  private findNearestColorName(color: IRGBColor): string {
    return COLORS[
      Object
        .keys(COLORS)
        .map((arrayColor, key, arr) => {
          return { color: arr[key], distance: this.colorDistance(color, this.hexToRgb(arrayColor)) };
        })
        .sort((a, b) => a.distance > b.distance ? -1 : 1)
        .pop().color
    ];
  }

  /**
   * Convert HEX color to RGB values
   */
  private hexToRgb(hex: string): IRGBColor {
    return {
      red: parseInt(hex.substr(0, 2), 16),
      green: parseInt(hex.substr(2, 2), 16),
      blue: parseInt(hex.substr(4, 2), 16),
    };
  }

  /**
   * Compute the distance between two RGB colors
   */
  private colorDistance(left: IRGBColor, right: IRGBColor): number {
    return Math.abs(left.red - right.red) + Math.abs(left.green - right.green) + Math.abs(left.blue - right.blue);
  }

}
