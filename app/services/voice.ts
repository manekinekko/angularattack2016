import {Injectable, EventEmitter} from '@angular/core';
import * as annyang from 'annyang';
import {Phrase, Phrases} from './phrase';

const SPEECH_VOICE = 'US English Female';

declare var responsiveVoice;

@Injectable()
export class Voice {

  private rv: any = null;
  private isSpeaking: boolean = false;
  private q = [];

  public speaking = new EventEmitter<boolean>();
  public name = '';

  constructor(
    private phrase: Phrase
  ) {
    this.q = [];

    if ('responsiveVoice' in window) {
      this.rv = responsiveVoice;
    }
  }

  start() {
    this.rv.OnVoiceReady = () => {
      this.rv.setDefaultVoice(SPEECH_VOICE);
      this.say(`${this.phrase.get(Phrases.GREETING)}. ${this.phrase.get(Phrases.HELP)}`, { delay: 1000 });
      this.say(`${this.phrase.get(Phrases.NAME)}`, { delay: 4000 });

      this.q.forEach( (text) => this.say(text, { delay: 8000}) );
      this.q = [];

    };
  }

  /**
   * push some text to be spoken later.
   */
  sayDelay(text: string) {
    this.q.push(text);
  }

  /**
   * text to voice.
   */
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
          Here are the commands I can understand:

          'my name is ',

          'let me see', 'show me', '(describe) what do you see',

          'how do I look',

          'tell me colors', 'what color is this',

          'help', 'what should I say',

          'who are you',

          '(can you) read this (for me)', 'read it',

          also, you can say

          'and this', 'and now',

          in order to run the last query.
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
    this.say(`Sorry ${this.name}, I don't understand ${blah}. If you are lost, just say "help"`);
  }

}
