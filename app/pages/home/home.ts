import {Inject, ViewChild, ElementRef, Renderer} from 'angular2/core';
import {Page} from 'ionic-angular';
import * as annyang from 'annyang';
import {Vision} from '../../services/vision';

declare var responsiveVoice;

const WELCOME_TEXT: string = `
    ${ !(((Math.random()*99)|0)%2) ? 'Welcom':'Hi' }.
    Please use your voice to interact with me.
  `;

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [Vision],
  styles: [`
    video {display: none;}
    ion-card ion-card-content {padding: 0; line-height: 0; text-align: center;}
  `]
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
    responsiveVoice.OnVoiceReady = () => {
      this.speak();
    };

    this.vision.onResults().subscribe(
      (labels) => {
        let text = `I see...${labels.join('! ')}`;
        if(labels.length === 0) {
          text = `Sorry! I could not recognize what you are showing me...`;
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
      'let me see': this.describeWhatISee.bind(this),
      'show me': this.describeWhatISee.bind(this),
      'how do I look': this.describeFacial.bind(this)
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start({continuous: true});
  }

  private describeFacial() {
    this.say('Facial expressions are not yet implemented.');
  }

  private describeWhatISee() {
    this.say('Ok!');
    this.vision.process(this.nativeCanvas.toDataURL());
  }

  private say(text: string) {
    responsiveVoice.speak(text);
  }

  private speak() {
    setTimeout(this.say(WELCOME_TEXT), 2000);
  }
}
