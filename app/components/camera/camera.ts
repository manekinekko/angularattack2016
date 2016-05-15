import {Component, ViewChild, Renderer, ElementRef, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'letmesee-camera',
    template: `
  <canvas width='1280' height='720' #canvas></canvas>
  <video width='1280' height='720' #video preload='auto' autoplay></video>
  `
})
export class CameraComponent {

  @ViewChild('canvas') canvas;
  @ViewChild('video') video;

  @Output('onDimensionUpdate') dimensionUpdated = new EventEmitter<any>();

  private nativeCanvas: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer
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
        { video: { width: 1280, height: 720 } },
        (stream) => videoNative.src = window.URL.createObjectURL(stream),
        (e) => console.log('failed', e)
      );
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

        self.dimensionUpdated.emit({vw, vh});

    }, false);
    videoNative.addEventListener('play', draw, false);
  }

  getImageAsBase64() {
    return this.nativeCanvas.toDataURL();
  }

}
