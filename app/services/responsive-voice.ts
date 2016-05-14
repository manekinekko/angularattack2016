import { Injectable } from 'angular2/core';

import * as annyang from 'annyang';

declare var responsiveVoice;

@Injectable()
export class ResponsiveVoice {

  constructor() { }

  public listen(commands: annyang.CommandOption, welcomeText: string) {

    if('annyang' in window) {
      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening.
      annyang.start({ continuous: true });
    }

    // Setup defaults and say welcome
    if('responsiveVoice' in window) {
      responsiveVoice.OnVoiceReady = () => {
        responsiveVoice.setDefaultVoice('US English Female');
        setTimeout(this.say(welcomeText), 2000);
      };
    }
  }

  public say(text: string) {
    responsiveVoice.speak(text);
  }

}
