import { Component, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
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
public running: boolean;
 public timer: any;
 public timer_status: FirebaseObjectObservable<any>;
 public clock: any;
 public subs: any;

  constructor( public af: AngularFire) {
    this.timer_status = af.database.object('/timer_status');
    // console.log('Hello CrTimer Component');
    // this.time = time;
    // console.log(this.time);
    this.timer_status.subscribe(timer_statusObj => {
      // console.log(timer_statusObj.running)
      // console.log(timer_statusObj.time);
      this.running = timer_statusObj.running;
      this.time = timer_statusObj.time;
      
    });// end timer_status

  }
  ngOnInit() { this.startTimer(); }
  ngOnDestroy(){
    this.subs.unsubscribe();
  console.log('adios');
  }

 startTimer() {

     this.clock = Observable.interval(1000);
      // .map((x) => (x))
      this.subs = this.clock.subscribe((x) => {
        // console.log(x);
        
        this.timer = (this.time - 1000);
        if (this.timer <= 0) {
          console.log('time over');
          this.subs.unsubscribe();
          this.running = false;
          this.timer_status.update({ time: 300000 });
          
        }else{
          // update db
          this.timer_status.update({ time: this.timer });
        }
      })
  }

}
