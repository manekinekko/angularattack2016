
import { Component } from '@angular/core';
import {
  Platform,
  ionicBootstrap,
  Vibration
} from 'ionic-native';

import { HomePage } from './pages/home/home';
import { Voice } from './services/voice';
import { Speech } from './services/speech';
import { Vision } from './services/vision';
import { Phrase } from './services/phrase';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [Vision, Speech, Voice, Phrase],
  config: {}
})
export class MyApp {

  public rootPage: any;

  constructor(platform: Platform, private voice: Voice) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      this.voice.start();
      Vibration.vibrate(500);
    });

  }
}

ionicBootstrap(MyApp);
