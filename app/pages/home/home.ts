import {Inject, ViewChild, ElementRef, Renderer} from 'angular2/core';
import {Page} from 'ionic-angular';

declare var annyang;
declare var responsiveVoice;

const WELCOME_TEXT: string = `
    Welcom. Please use your voice to interact with me.
    Say "let me see" and I will tell you what I see.
    Say "how do I look" and I will tell you how do you look.
  `;

@Page({
  templateUrl: 'build/pages/home/home.html',
  styles: [`
    video {display: none;}
    ion-card ion-card-content {padding: 0; line-height: 0; text-align: center;}
  `]
})
export class HomePage {

  @ViewChild('canvas') canvas;
  @ViewChild('video') video;

  constructor(
    elementRef: ElementRef,
    renderer: Renderer
  ) { }

  ngOnInit() {
    this.listen();
    responsiveVoice.OnVoiceReady = () => {
      this.speak();
    };
  }

  ngAfterViewInit() {

    window.URL = window.URL || (<any>window).webkitURL;
    (<any>navigator).getUserMedia = (<any>navigator).getUserMedia || (<any>navigator).webkitGetUserMedia;
    let video = this.video.nativeElement;
    let canvas = this.canvas.nativeElement;
    let context = canvas.getContext('2d');
    let vw, vh;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true },
        (stream) => {
          video.src = window.URL.createObjectURL(stream);
        },
        (e) => console.log('failed', e));
    }

    let draw = () => {
      if (video.paused || video.ended) {
        return;
      }
      context.drawImage(video, 0, 0, vw, vh);
      window.requestAnimationFrame(draw);
    };

    video.addEventListener('loadedmetadata', function () {
      vw = this.videoWidth || this.width;
      vh = this.videoHeight || this.height;
      canvas.width = Math.min(window.innerWidth, vw);
      canvas.height = vh;
    }, false);
    video.addEventListener('play', draw, false);

  }

  private listen() {
    if (annyang) {
      // Let's define a command.
      let commands = {
        'let me see': () => {
          this.say('The cloud vision API is not yet implemented.');
        },
        'how do I look': () => {
          this.say('Facial expressions are not yet implemented.');
        }
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening.
      annyang.start();
    }
  }

  private say(text: string) {
    responsiveVoice.speak(text);
  }

  private speak() {
    setTimeout(
      this.say(WELCOME_TEXT)
      , 2000);
  }
}
