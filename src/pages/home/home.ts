import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
// import { AddItemPage } from '../add-item/add-item';
// import { EditItemPage } from '../edit-item/edit-item';
// import { ItemDetailPage } from '../item-detail/item-detail';
import { AboutPage } from '../about/about';
// import {CrTimerComponent} from '../../components/cr-timer/cr-timer';
// import { Data } from '../../providers/data';
// import { Observable } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // public items = [];
  // public addModal = this.modalCtrl.create(AddItemPage);
  public time: number;
  public running;
  // public coffees: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public timer_status: FirebaseObjectObservable<any>;

  constructor(
    public navCtrl: NavController,
    public toast: ToastController,
    // public dataService: Data,
    public actionSheetCtrl: ActionSheetController,
    public af: AngularFire,
    public alertCtrl: AlertController
  ) {
    // this.coffees = af.database.list('/coffees');
    this.users = af.database.list('/users');
    this.timer_status = af.database.object('/timer_status');
    // this.running = this.timer_status.running;
    this.timer_status.subscribe(timer_statusObj => {
      // console.log(timer_statusObj.running)
      // console.log(timer_statusObj.time);
      this.running = timer_statusObj.running;
      this.time = timer_statusObj.time;
    });



    // console.log(this.coffees);

  }
  ionViewDidLoad() {
    // if user has no coffee and there is time, pop open this
    // this.addModal.present();
    // console.log(this.timer_status);

    if (this.running) {
      this.addCoffee();
    }

  }
  // startTimer() {
  //   Observable.interval(1000)
  //     .map((x) => x + 1)
  //     .subscribe((x) => {
  //       this.timer = (60 * 5 - x) * 1000;
  //       if (this.timer === 0) {
  //         console.log('time over');
  //         this.running = false;
  //       }
  //     })
  // }
  startRun() {
    // console.log('Coffee run start');
    // this.running = true;
    // this.startTimer();
  }
  stopRun() {
    console.log('Coffee run deleted');
    // this.running = false;
    // this.running = true;
    // this.startTimer();
  }

  addCoffee() {
    let prompt = this.alertCtrl.create({
      title: 'Howdy!',
      // message: "So which coffee would you like?",
      inputs: [
        {
          name: 'name',
          placeholder: 'Who are you?'
        },
        {
          name: 'coffee',
          placeholder: '...and what would you like?'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            // check if already ordered
            if (data.name != '' && data.coffee != '') {
              if (this.users[data.name] != '') {
                // console.log('no more');
                // launch a toast!
                this.presentToast(data.name);

              } else {
                this.users.push({
                  // name: 'user', 
                  user: data.name,
                  coffee: data.coffee,
                  isDone: false
                });
              }
            }


          }
        }
      ]
    });
    prompt.present();
  }

  presentToast(bustedUser) {
    let toast = this.toast.create({
      message: bustedUser + 'Seems like you already ordered one!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  toggleCheck(user) {
    // console.log(user.$key);
    // console.log(key);
    // user.isDone = !user.isDone;
    // let key = user.$key;
    // console.log(key);

    // let itemObservable = this.af.database.object('/users');
    // console.log(itemObservable);

    this.users.update(user.$key, { isDone: !user.isDone });
  }
  // saveItem(item) {

  // }
  update(user) {
    console.log(user);

    // this.users[].update({ isDone: isDone });
  }
  // removeItem(item) {

  // }

  // viewItem(item) {
  // //   this.navCtrl.push(ItemDetailPage, {
  // //     item: item
  // //   });
  // }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'More Actions',
      buttons: [
        // {
        //   text: 'Restart Timer',
        //   // role: 'destructive',
        //   handler: () => {
        //     console.log('Restart timer');
        //     this.running = false;
        //     // this.stopRun();
        //     // no restarting??
        //     this.running = true;
        //     // this.startRun();
        //     // this.timer = 0;
        //     // this.startTimer();
        //   }
        // },
        {
          text: 'Add 5 mins',
          // role: 'destructive',
          handler: () => {
            console.log('adding time');
            // this.running = false;
            // this.stopRun();
            // no restarting??
            // this.running = true;
            // this.startRun();
            // this.timer = 0;
            // this.startTimer();
          }
        },
        {
          text: 'Cancel Run',
          // role: 'destructive',
          handler: () => {
            console.log('Cancel run');
            // this.running = false;
          }
        },
        {
          text: 'About',
          handler: () => {
            console.log('About page clicked');
            this.navCtrl.push(AboutPage);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}