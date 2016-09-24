import {Component, ViewChild, Renderer, ElementRef, Output, EventEmitter} from '@angular/core';
import {Voice} from '../../services/voice';

export let CAMERA_TYPE = {
  "FRONT": "facing front",
  "REAR": "facing back"
};

@Component({
    selector: 'letmesee-camera',
    template: `
  <canvas [width]='cameraConstraints.width.ideal' [height]='cameraConstraints.height.ideal' #canvas></canvas>
  <video [width]='cameraConstraints.width.ideal' [height]='cameraConstraints.height.ideal' #video preload='auto' autoplay></video>
  `
})
export class CameraComponent {

  @ViewChild('canvas') canvas;
  @ViewChild('video') video;

  @Output('onDimensionUpdate') dimensionUpdated = new EventEmitter<any>();

  private nativeCanvas: any;

  private cameraConstraints = {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 776, ideal: 720, max: 1080 }
  };

  private videoSource;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private voice: Voice
  ) {
    this.videoSource = { facingMode: CAMERA_TYPE.REAR };
  }

  ngAfterViewInit() {

    window.URL = window.URL || (<any>window).webkitURL;

    // https://developers.google.com/web/updates/2015/10/media-devices?hl=en#getusermedia
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    (<any>window).MediaDevices = (<any>window).MediaDevices || navigator.getUserMedia;

    this.nativeCanvas = this.canvas.nativeElement;
    let context = this.nativeCanvas.getContext('2d');
    let videoNative = this.video.nativeElement;
    let vw, vh;

    if ('MediaDevices' in window || navigator.getUserMedia) {

      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          return devices
            .filter( (device) => device.kind === 'videoinput' );
        })
        .then( (devices) => {

          navigator.getUserMedia(
            { video: this.figureOutWhichCameraToUse(devices) },
            (stream) => videoNative.src = window.URL.createObjectURL(stream),
            (e) => console.log('failed', e)
          );

        })
        .catch((err) => {
          console.log(err.name + ": " + err.message);
        });
    }

    let draw = () => {
        if (videoNative.paused || videoNative.ended) {
            return false;
        }
        context.drawImage(videoNative, 0, 0, vw, vh);
        window.requestAnimationFrame(draw);
    };

    var self = this;
    videoNative.addEventListener('loadedmetadata', function() {
        vw = this.videoWidth || this.width;
        vh = this.videoHeight || this.height;
        self.nativeCanvas.width = Math.min(window.innerWidth, vw);
        self.nativeCanvas.height = vh;

        self.dimensionUpdated.emit({vw:self.nativeCanvas.width, vh});

    }, false);
    videoNative.addEventListener('play', draw, false);
  }

  private figureOutWhichCameraToUse(devices): any {
    let device = devices
      .filter( (device) => device.label.indexOf(CAMERA_TYPE.FRONT) !== -1 )
      .pop();

    if(device) {
      return {deviceId: device.deviceId ? {exact: device.deviceId} : undefined};
    }
    return true;
  }

  getImageAsBase64() {
    return this.nativeCanvas.toDataURL();
  }

}
