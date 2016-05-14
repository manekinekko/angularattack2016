import {Inject, ViewChild, ElementRef, Renderer} from 'angular2/core';
import {Page} from 'ionic-angular';

declare var annyang;
declare var responsiveVoice;

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

  private TEXT: string = `
    Welcom. Please use your voice to interact with me.
    Say "let me see" and I will tell you what I see.
    Say "how do I look" and I will tell you how do you look.
  `;

  constructor(
    elementRef: ElementRef,
    renderer: Renderer
  ) {}

  ngOnInit() {
    this.listen();
    responsiveVoice.OnVoiceReady = () => {
      this.speak();
    }
  }

  ngAfterViewInit() {

    window.URL = window.URL || (<any>window).webkitURL ;
    (<any>navigator).getUserMedia = (<any>navigator).getUserMedia || (<any>navigator).webkitGetUserMedia;

    if((<any>navigator).getUserMedia){
      (<any>navigator).getUserMedia({video: true},
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
    }

    let video = this.video.nativeElement;
    let canvas = this.canvas.nativeElement;
    let context = canvas.getContext('2d');
    let vw, vh;
    video.addEventListener('loadedmetadata', function() {
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
      var commands = {
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
      this.say(this.TEXT)
    , 2000);
  }
}
