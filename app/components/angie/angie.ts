import {Component, Input, Output, OnChanges, HostListener, EventEmitter} from 'angular2/core';

@Component({
  selector: 'letmesee-angie',
  templateUrl: 'build/components/angie/angie.html'
})
export class AngieComponent implements OnChanges {

  @Input() speaking: boolean;
  @Output('onTap') tap$: EventEmitter<boolean>;

  private mouthOpen: boolean = false;
  private speakTimer: number;

  constructor(){
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
      this.mouthOpen = !this.mouthOpen;
    }, 200);
  }
}
