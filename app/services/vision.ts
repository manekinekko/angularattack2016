import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
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
  private obs$: EventEmitter<any>;
  private visionEndpoint: string;

  constructor(private http: Http) {

    this.obs$ = new EventEmitter<any>();
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
    this.post(request);
  }

  onResults() {
    return this.obs$;
  }

  private post(request: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.VISION_ENDPOINT, JSON.stringify(request), headers)
      .map(res => res.json())
      .subscribe(
        data => this.processMetadata(data),
        err => this.obs$.emit({error:true}),
        () => console.log('Image analysis Complete')
      );
  }

  private processMetadata(data: any) {

    data.responses = data.responses || {};
    if(Array.isArray(data.responses)) {
      data.responses = data.responses.pop();
    }

    let labels = [];
    (data.responses.labelAnnotations || []).forEach( (lbl) => {
        labels.push(lbl.description);
    });

    if(labels.length === 0) {
      (data.responses.faceAnnotations || []).forEach( (expression) => {
          for(var exp in expression) {
            if( exp.indexOf('Likelihood') !== -1 ) {
              labels.push(exp.replace('Likelihood', ''));
            }
          }
      });
    }

    this.obs$.emit({labels:labels});
  }
}
