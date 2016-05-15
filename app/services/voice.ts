import { Injectable } from 'angular2/core';

import * as annyang from 'annyang';

declare var responsiveVoice;

@Injectable()
export class Voice {

  private rv: any = null;

  constructor() {
    if('responsiveVoice' in window) {
      this.rv = responsiveVoice;
    }
  }

  start() {
    this.rv.OnVoiceReady = () => {
      this.rv.setDefaultVoice('US English Female');
      this.say('Hi. How can I help you?', {delay:1000});
    };
  }

  say(text: string, options: any = {}) {
    options.delay = options.delay || 0;
    setTimeout(() => this.rv.speak(text), options.delay);
  }

  help() {
    this.say('Ask me how do you look and I will tell you');
    this.say('Or');
    this.say('if you need to know what around you just ask');
    this.say('I can also show you colors');
  }

  whoAmI() {
    this.say('My name is Angie, and I am here to help you see the world.');
  }

  rememberName(name?) {
    this.say(`Hi ${name}, how can I help you`);
  }

  sorry(blah?) {
    this.say(`Sorry, I don't understand ${blah}. If you are lost, just say "help"`);
  }
}