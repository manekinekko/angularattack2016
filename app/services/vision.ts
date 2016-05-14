import {Injectable, EventEmitter} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Vision {

  private apiKey = "AIzaSyAxtYY-XwspbDUGYF21aqSlFxTnI8EGzbw";
  private VISION_ENDPOINT = "https://vision.googleapis.com/v1/images:annotate?key=" + this.apiKey;
  private FEATURE_TYPE: string[] = [
    'TYPE_UNSPECIFIED',
    'FACE_DETECTION',
    'LANDMARK_DETECTION',
    'LOGO_DETECTION',
    'LABEL_DETECTION',
    'TEXT_DETECTION',
    'SAFE_SEARCH_DETECTION',
    'IMAGE_PROPERTIES'
  ];
  private obs$: EventEmitter<string[]>;

  constructor(private http: Http) {
    this.obs$ = new EventEmitter<string[]>();
  }

  process(base64: string) {
    let request: any = {
      requests: [{
        image: {
          content: base64.replace(/data:image\/(jpeg|png);base64,/g, '')
        },
        features: [{
          type: this.FEATURE_TYPE[4],
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
        err => console.log(err),
        () => console.log('Image analysis Complete')
      );
  }

  private processMetadata(data: any){
    data = data.responses
      .map( (arg) => arg.labelAnnotations)
      .map( (arg) => (arg||[]).map( o => o.description ))
    data = <string[]>([].concat.apply([], data));

    if(data.length > 0) {
      this.obs$.emit(data);
    }
    else {
      this.obs$.emit([]);
    }
  }
}
