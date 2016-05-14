import {Inject, ViewChild, ElementRef, Renderer} from 'angular2/core';
import {Page} from 'ionic-angular';
import * as annyang from 'annyang';
import {Vision, FEATURE_TYPE} from '../../services/vision';

declare var responsiveVoice;

const WELCOME_TEXT: string = `
    Hi. How can I help you?
  `;

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [Vision]
})
export class HomePage {

  @ViewChild('canvas') canvas;
  @ViewChild('video') video;

  private nativeCanvas: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private vision: Vision
  ) { }

  ngOnInit() {

    this.listen();


    if('responsiveVoice' in window) {
      responsiveVoice.OnVoiceReady = () => {
        responsiveVoice.setDefaultVoice('US English Female');
        setTimeout(this.say(WELCOME_TEXT), 4000);
      };
    }


    this.vision.onResults().subscribe(
      (data) => {
        let text = '';
        if(data.labels) {
          text = `I see, ${data.labels.join(', ')}`;
          if(data.labels.length === 0) {
            text = `Sorry! I could not recognize what I see.`;
          }
        }
        else if (data.error) {
          text = `Sorry! I am not able to give an answer. Please try later.`;
        }

        this.say(text);
      },
      (err) => console.error(err),
      () => console.log('done')
    );
  }

  ngAfterViewInit() {

    window.URL = window.URL || (<any>window).webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

    this.nativeCanvas = this.canvas.nativeElement;
    let context = this.nativeCanvas.getContext('2d');
    let videoNative = this.video.nativeElement;
    let vw, vh;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true },
        (stream) => {
          videoNative.src = window.URL.createObjectURL(stream);
        },
        (e) => console.log('failed', e));
    }

    let draw = () => {
      if (videoNative.paused || videoNative.ended) {
        return false;
      }
      context.drawImage(videoNative, 0, 0, vw, vh);
      window.requestAnimationFrame(draw);
    };

    var self = this;
    videoNative.addEventListener('loadedmetadata', function () {
      vw = this.videoWidth || this.width;
      vh = this.videoHeight || this.height;
      self.nativeCanvas.width = Math.min(window.innerWidth, vw);
      self.nativeCanvas.height = vh;
    }, false);
    videoNative.addEventListener('play', draw, false);

  }

  private listen() {
    // Let's define a command.
    let commands: annyang.CommandOption = {
      'show me': this.describeWhatISee.bind(this),
      'what do you see': this.describeWhatISee.bind(this),
      'how do I look': this.describeFacial.bind(this)
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start({continuous: true});
  }

  private describeFacial() {
    //this.say('Sorry! Facial expressions are not yet implemented.');
    this.vision.process(this.getBase64(), FEATURE_TYPE.FACE_DETECTION);
  }

  private describeWhatISee() {
    this.say('Ok. let me check that for you.');
    setTimeout(this.vision.process(this.getBase64()), 1000);
  }

  private getBase64() {
    return this.nativeCanvas.toDataURL();
  }

  private say(text: string) {
    responsiveVoice.cancel();
    responsiveVoice.speak(text);
  }

}
