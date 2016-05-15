import {Inject, ViewChild, ElementRef, Renderer} from 'angular2/core';
import {Page} from 'ionic-angular';
import {Speech} from '../../services/speech';
import {Vision, FEATURE_TYPE} from '../../services/vision';
import {Voice} from '../../services/voice';
import {Phrase, Phrases} from '../../services/phrase';
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
    private phrase: Phrase,
    private elementRef: ElementRef,
    private renderer: Renderer
  ) {

    this.lastCommand = () => { };
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
        'i am :name',
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
        'tell me colors',
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
      .addCommands([
        '(can you) read this (for me)',
        'read it',
        () => setTimeout(this.describeText.bind(this), 1000)
      ])
      .start();
  }

  updateCardDimension(event) {
    this.renderer.setElementStyle(this.card.nativeElement, 'width', `${event.vw}px`);
  }

  describeHelp() {
    this.voice.help();
  }

  private describeWhatISee() {
    this.lastCommand = () => {
      this.voice.say(`${this.phrase.get(Phrases.OK)} ${this.voice.name}. ${this.phrase.get(Phrases.LOOKUP_THINGS)}`);
      this.vision.process(this.camera.getImageAsBase64()).subscribe(
        data => this.voice.say(this.formatText(data.labels), { delay: 2000 }),
        err => console.error(err),
        () => console.log('done')
      );
    };

    this.lastCommand();
  }

  private describeFacial() {
    this.lastCommand = () => {
      this.voice.say(`${this.phrase.get(Phrases.OK)} ${this.voice.name}. ${this.phrase.get(Phrases.LOOKUP_FACE)}`);
      this.vision.process(this.camera.getImageAsBase64(), FEATURE_TYPE.FACE_DETECTION)
        .subscribe(
        data => this.voice.say(this.formatText(data.face), { delay: 1500 }),
        err => console.error(err),
        () => console.log('done')
        );
    };

    this.lastCommand();
  }

  private describeColor() {
    this.lastCommand = () => {
      this.voice.say(`${this.phrase.get(Phrases.OK)} you need colors. ${this.phrase.get(Phrases.LOOKUP_COLOR)} ${this.voice.name}.`);
      this.vision.process(this.camera.getImageAsBase64(), FEATURE_TYPE.IMAGE_PROPERTIES)
        .subscribe(
        data => this.voice.say(`Well ${this.voice.name}, I see mostly ${data.color}`, { delay: 1500 }),
        err => console.error(err),
        () => console.log('done')
        );
    };

    this.lastCommand();
  }

  private describeText() {
    this.lastCommand = () => {
      this.voice.say(`${this.phrase.get(Phrases.OK)}. ${this.phrase.get(Phrases.LOOKUP_TEXT)} ${this.voice.name}.`);
      this.vision.process(this.camera.getImageAsBase64(), FEATURE_TYPE.TEXT_DETECTION)
        .subscribe(
        data => this.voice.say(this.formatText(data.text, 'Here is the extracted text:'), { delay: 2000 }),
        err => console.error(err),
        () => console.log('done')
        );
    };

    this.lastCommand();
  }

  private replayLastCommand() {
    this.lastCommand();
  }

  private formatText(data: string[] = [], defaultText: string = 'I see'): string {
    console.log(data);

    let text = `Well ${this.voice.name}, ${defaultText} ${data.join(', ')}`;
    if (data.length === 0) {
      text = `Sorry ${this.voice.name}! I could not recognize what I see.`;
    }
    return text;
  }
}
