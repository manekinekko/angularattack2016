import {Injectable, EventEmitter} from 'angular2/core';
import * as annyang from 'annyang';
import {Phrase, Phrases} from './phrase';

const SPEECH_VOICE = 'US English Female';

declare var responsiveVoice;

@Injectable()
export class Voice {

  private rv: any = null;
  private isSpeaking: boolean = false;

  public speaking = new EventEmitter<boolean>();
  public name = '';

  constructor(
    private phrase: Phrase
  ) {
    if ('responsiveVoice' in window) {
      this.rv = responsiveVoice;
    }
  }

  start() {
    this.rv.OnVoiceReady = () => {
      this.rv.setDefaultVoice(SPEECH_VOICE);
      this.say(`${this.phrase.get(Phrases.GREETING)}. How can I help you?`, { delay: 1000 });
      this.say('What is your name?', { delay: 4000 });
    };
  }

  say(text: string, options: any = {}) {
    options.delay = options.delay || 0;
    setTimeout(() => {
      this.rv.speak(text, SPEECH_VOICE, {
        onstart: () => {
          this.isSpeaking = true;
          this.speaking.emit(true);
        },
        onend: () => {
          this.isSpeaking = false;
          this.speaking.emit(false);
        }
      });
    }, options.delay);
  }

  help() {
    if(this.isSpeaking === false) {
      this.say(`
        Ask me how do you look and I will tell you
        Or
        if you need to know what around you just ask
        I can also show you colors, and read text
      `);
    }
  }

  whoAmI() {
    this.say(`You are welcome ${name}, I am your assistant Angie, and I am here to help you see the world.`);
  }

  rememberName(name?) {
    this.name = name;
    this.say(`${this.phrase.get(Phrases.GREETING)} ${this.name}, how can I help you`);
  }

  sorry(blah?) {
    this.say(`Sorry ${this.name}, I don't understand ${blah}. If you are lost, just say`);
    this.say(`"help"`, { delay: 4000 + blah.length * 50 });
  }
}
