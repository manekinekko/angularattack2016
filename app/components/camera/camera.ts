import {Component, ViewChild, Renderer, ElementRef, Output, EventEmitter} from 'angular2/core';
import {Voice} from '../../services/voice';

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

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private voice: Voice
  ) {}

  ngAfterViewInit() {

    window.URL = window.URL || (<any>window).webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

    this.nativeCanvas = this.canvas.nativeElement;
    let context = this.nativeCanvas.getContext('2d');
    let videoNative = this.video.nativeElement;
    let vw, vh;

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        (stream) => videoNative.src = window.URL.createObjectURL(stream),
        (e) => console.log('failed', e)
      );

      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          let cameras = devices
            .filter( (device) => device.kind === 'videoinput' );

          this.voice.sayDelay(`Hey, I found ${cameras.length} cameras`);
          // console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
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

  getImageAsBase64() {
    return this.nativeCanvas.toDataURL();
  }

}
