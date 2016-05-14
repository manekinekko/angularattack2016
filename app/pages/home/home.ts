import {Inject, ViewChild, ElementRef, Renderer} from 'angular2/core';
import {Page} from 'ionic-angular';

import {CommandOption} from 'annyang';

import {Vision} from '../../services/vision';
import {ResponsiveVoice} from '../../services/responsive-voice';

const WELCOME_TEXT: string = `
    ${ !(((Math.random() * 99) | 0) % 2) ? 'Welcome' : 'Hi'}.
    Please use your voice to interact with me.
  `;

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [Vision, ResponsiveVoice]
})
export class HomePage {

  @ViewChild('canvas') canvas;
  @ViewChild('video') video;

  private nativeCanvas: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private vision: Vision,
    private voiceService: ResponsiveVoice
  ) { }

  ngOnInit() {

    // Let's define our command.
    let commands: CommandOption = {
      'let me see': this.describeWhatISee.bind(this),
      'show me': this.describeWhatISee.bind(this),
      'describe what do you see': this.describeWhatISee.bind(this),
      'how do I look': this.describeFacial.bind(this)
    };

    this.voiceService.listen(commands, WELCOME_TEXT);

    this.vision.onResults().subscribe(
      (labels) => {
        let text = `I see...${labels.join('! ')}`;
        if (labels.length === 0) {
          text = `Sorry! I could not recognize what you are showing me...`;
        }
        this.voiceService.say(text);
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

  private describeFacial() {
    this.voiceService.say('Facial expressions are not yet implemented.');
  }

  private describeWhatISee() {
    this.voiceService.say('Ok!');
    this.vision.process(this.nativeCanvas.toDataURL());
  }
}
