import {Component, Input, Output, OnChanges, HostListener, EventEmitter} from '@angular/core';

@Component({
  selector: 'letmesee-angie',
  templateUrl: 'build/components/angie/angie.html'
})
export class AngieComponent implements OnChanges {

  @Input() speaking: boolean;
  @Output('onTap') tap$: EventEmitter<boolean>;

  public eyebrowsRightUp: boolean = false;
  public eyebrowsLeftUp: boolean = false;
  private mouthOpen: boolean = false;
  private speakTimer: number;

  constructor() {
    this.tap$ = new EventEmitter<boolean>();
  }

  @HostListener('click', ['$event'])
  onClick(e) {
    this.tap$.emit(true);
  }

  ngOnChanges() {
    if (this.speakTimer) {
      clearInterval(this.speakTimer);
      this.mouthOpen = false;
    }
    if (this.speaking) {
      this.speak();
    }
  }

  speak() {
    this.speakTimer = setInterval(() => {
      this.mouthOpen = this.randomBool();
      this.eyebrowsLeftUp = this.randomBool();
      this.eyebrowsRightUp = this.randomBool();
    }, 200);
  }

  private randomBool() {
    return Math.random() < .5;
  }
}
