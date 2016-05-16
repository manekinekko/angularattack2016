import { Injectable } from 'angular2/core';
import * as annyang from 'annyang';

@Injectable()
export class Speech {

  private commands: any[];

  constructor() {
    this.commands = [];
  }

  public addCommands(commands: any[]) {
    let action = commands.pop();

    // @todo dynamic Object keys are not working with TS 1.8.10!
    //commands.forEach( phrase => this.commands.push({ [phrase]: action }) );

    commands.forEach( phrase => {
      let o = {};
      o[phrase] = action;
      this.commands.push(o);
    });

    return this;

  }

  public start() {

    if(annyang) {
      this.commands.forEach(annyang.addCommands);
      annyang.start({ continuous: true });
    }
    else {
      console.error('speech recognition is not available.');
    }

  }
}
