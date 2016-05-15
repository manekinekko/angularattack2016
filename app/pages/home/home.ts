import {Inject, ViewChild, ElementRef, Renderer} from 'angular2/core';
import {Page} from 'ionic-angular';
import {Speech} from '../../services/speech';
import {Vision, FEATURE_TYPE} from '../../services/vision';
import {Voice} from '../../services/voice';
import {CameraComponent} from '../../components/camera/camera';
import {AngieComponent} from '../../components/angie/angie';

@Page({
  templateUrl: 'build/pages/home/home.html',
  directives: [CameraComponent, AngieComponent]
})
export class HomePage {

  @ViewChild(CameraComponent) camera: CameraComponent;
  @ViewChild('card') card;

  private lastCommand: Function;
  private angieSpeaking: boolean = false;

  constructor(
    private speech: Speech,
    private vision: Vision,
    private voice: Voice,
    private elementRef: ElementRef,
    private renderer: Renderer
  ) {

    this.lastCommand = () => {};
  }

  ngOnInit() {
    this.voice.speaking.subscribe(value => {
      this.angieSpeaking = value;
    });
  }

  ngAfterViewInit() {

    this.speech
      .addCommands([
        'my name is :name',
        (name) => this.voice.rememberName(name)
      ])
      .addCommands([
        'let me see',
        'show me',
        '(describe) what do you see',
        () => setTimeout(this.describeWhatISee.bind(this), 1000)
      ])
      .addCommands([
        'how do I look',
        () => setTimeout(this.describeFacial.bind(this), 1000)
      ])
      .addCommands([
        'what color is this',
        () => setTimeout(this.describeColor.bind(this), 1000)
      ])
      .addCommands([
        'help',
        'what should I say',
        () => this.voice.help()
      ])
      .addCommands([
        'who are you',
        () => this.voice.whoAmI()
      ])
      .addCommands([
        'and this',
        'and now',
        () => this.replayLastCommand()
      ])
      .start();
  }

  updateCardDimension(event) {
    this.renderer.setElementStyle(this.card.nativeElement, 'width', `${event.vw}px`);
  }

  private describeWhatISee() {
    this.lastCommand = () => {
      this.voice.say('Ok. let me check that for you.');
      this.vision.process(this.camera.getImageAsBase64()).subscribe(
        data => this.voice.say(this.formatText(data.labels), {delay:2000}),
        err => console.error(err),
        () => console.log('done')
      );
    };

    this.lastCommand();
  }

  private describeFacial() {
    this.lastCommand = () => {
      this.voice.say('Ok. let me guess.');
      this.vision.process(this.camera.getImageAsBase64(), FEATURE_TYPE.FACE_DETECTION)
      .subscribe(
        data => this.voice.say(this.formatText(data.face), {delay:1500}),
        err => console.error(err),
        () => console.log('done')
      );
    };

    this.lastCommand();
  }

  private describeColor() {
    this.lastCommand = () => {
      this.voice.say('Ok. let me analyse it.');
      this.vision.process(this.camera.getImageAsBase64(), FEATURE_TYPE.IMAGE_PROPERTIES)
      .subscribe(
        data => this.voice.say(`Well, I see mostly ${data.color}`, {delay:1500}),
        err => console.error(err),
        () => console.log('done')
      );
    };

    this.lastCommand();
  }

  private replayLastCommand() {
    this.lastCommand();
  }

  private formatText(data: string[] = []): string {
    let text = `I see, ${data.join(', ')}`;
    if (data.length === 0) {
      text = `Sorry! I could not recognize what I see.`;
    }
    return text;
  }
}
