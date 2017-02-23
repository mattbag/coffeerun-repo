import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the CrTimer component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

@Component({
  selector: 'cr-timer',
  templateUrl: 'cr-timer.html'
})
export class CrTimerComponent {
// public time = this.time;
// @Input() time: number;
@Input('time') time: number;
 public timer: any;

  constructor() {
    // console.log('Hello CrTimer Component');
    // this.time = time;
    // console.log(this.time);
    

  }
  ngOnInit() { this.startTimer(); }

  startTimer() {
    console.log(this.time);
    let seconds = this.time * 60;
    
    Observable.interval(1000)
      .map((x) => x + 1)
      .subscribe((x) => {
        this.timer = (seconds - x) * 1000;
        if (this.timer === 0) {
          console.log('time over');
          // this.running = false;
        }
      })
  }

}
