import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
// import * as fb from 'firebase';

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
  // @Input('time') time: number;
  public time: number;
  public running: boolean;
  public timer: any;
  public time_left: number;
  public timer_status: FirebaseObjectObservable<any>;
  public clock: any;
  public subs: any;
  public start_time: any;

  constructor(public af: AngularFire) {
    this.timer_status = af.database.object('/timer_status');
    // console.log('Hello CrTimer Component');
    // this.time = time;
    // console.log(this.time);
    let now_time = new Date().getTime();
    this.timer_status.subscribe(timer_statusObj => {
      // console.log(timer_statusObj.running)
      // console.log(timer_statusObj.time);
      this.running = timer_statusObj.running;
      this.time = timer_statusObj.time;
      this.start_time = timer_statusObj.start_time;
      // console.log(this.start_time);

      let time_gone = now_time - this.start_time;
      this.time_left = this.time - time_gone;
      // console.log(this.time_left);

    });// end timer_status

  }
  ngOnInit() {
    console.log(this.time_left);

    this.startTimer();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
    // this.running = false;
    this.timer_status.update({ running: false });
    // console.log('adios');
  }

  startTimer() {
    // setInterval(() => {
    //   if (this.time_left <= 0) {
    //     console.log('time over');
    //      this.timer_status.update({ running: false });
    //     // this.timer_status.update({ time: 300000 });

    //   } else {
    //     time_left -= 1000;
    //   }

    //   // console.log(time_left);
    // }, 1000);
    this.clock = Observable.interval(1000);
    // .map((x) => (x))
    this.subs = this.clock.subscribe((x) => {
      // console.log(x);

      if (this.time_left <= 0) {

        console.log('time over');
        this.subs.unsubscribe();
        this.timer_status.update({ running: false });
        // this.timer_status.update({ time: 300000 });

      } else {
        this.time_left -= 1000;
        // console.log(this.time_left);

        // update db
        // this.timer_status.update({ time: this.time_left });
      }
    })
  }

}
