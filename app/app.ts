
import {App, Platform} from 'ionic-angular';
import {Vibration} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {Voice} from './services/voice';
import {Speech} from './services/speech';
import {Vision} from './services/vision';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [Vision, Speech, Voice],
  config: {}
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, private voice: Voice) {

    platform.ready().then(() => {
      this.voice.start();
      Vibration.vibrate(500);
    });

  }
}
