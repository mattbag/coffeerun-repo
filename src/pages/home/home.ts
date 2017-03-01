import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
// import { AddItemPage } from '../add-item/add-item';
// import { EditItemPage } from '../edit-item/edit-item';
// import { ItemDetailPage } from '../item-detail/item-detail';
import { AboutPage } from '../about/about';
import { LoginPage } from '../pages/login/login';
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
  public start_time: number;
  public running;
  public coffees: FirebaseListObservable<any>;
  public users: FirebaseListObservable<any>;
  public users_list: FirebaseListObservable<any>;
  public timer_status: FirebaseObjectObservable<any>;
  public countdown: number;
  public already_ordered: any[];

  constructor(
    public navCtrl: NavController,
    public toast: ToastController,
    // public dataService: Data,
    public actionSheetCtrl: ActionSheetController,
    public af: AngularFire,
    public alertCtrl: AlertController
  ) {
    this.coffees = af.database.list('/coffees');
    this.users = af.database.list('/users');
    this.users_list = af.database.list('/users_list');
    this.timer_status = af.database.object('/timer_status');

// this is a workaround to check whoever already ordered
    this.coffees.subscribe(coffeesArray => {
      this.already_ordered = [];
      // console.log(coffeesArray);
      coffeesArray.map(single => {
        this.already_ordered.push(single.user.toLowerCase());
      })
      // console.log(this.already_ordered);

    });


    this.timer_status.subscribe(timer_statusObj => {
      // console.log(timer_statusObj.running)
      // console.log(timer_statusObj.time);
      this.running = timer_statusObj.running;
      // this.time = timer_statusObj.time;
      this.start_time = timer_statusObj.start_time;
      if (this.running) {
        this.addCoffee();
      }

    });// end timer_status
    
  } // ================================================= //  end constructor

  ionViewDidLoad() {
    // console.log(this.start_time);

    // if user has no coffee and there is time, pop open this
    // console.log(this.timer_status);

  }
  
  startRun() {
    let start_time = new Date().getTime();
    // console.log(start_time);
    this.timer_status.update({ start_time: start_time });
    this.timer_status.update({ running: true });
  }
  stopRun() {
    console.log('Coffee run deleted');
    this.timer_status.update({ running: false });
    this.timer_status.update({ time: 300000 });
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
            // check if both input are full
            if (data.name != '' && data.coffee != '') {
              let lowerName = data.name.toLowerCase();
              console.log(this.already_ordered.indexOf(lowerName));

              if (this.already_ordered.indexOf(lowerName) > -1) {
                // console.log('no more');
                // launch a toast!
                this.presentToast(data.name);

              } else {
                this.coffees.push({
                  user: lowerName,
                  coffee: data.coffee,
                  isDone: false
                });
              }
            } else {
              // prompt.present();
            }


          }
        }
      ]
    });
    prompt.present();
  }
  //add new user
  addUser() {
    let prompt = this.alertCtrl.create({
      title: 'Oh yeah!',
      // message: "So which coffee would you like?",
      inputs: [
        {
          name: 'name',
          placeholder: 'Who will join us?'
        }
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
            // check if already created
            // console.log(this.users_list);

            if (data.name != '') {
              if (this.users_list[data.name] != '') {
                console.log('ok new user');
                this.users_list.push({
                  // name: 'user', 
                  user: data.name.toLowerCase()
                });

              } else {
                // launch a toast!
                // this.presentToast(data.name);
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
      message: bustedUser + '! Seems like you already ordered one!',
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

    this.coffees.update(user.$key, { isDone: !user.isDone });
  }

  // update(user) {
  //   console.log(user);

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
          handler: () => {
            console.log('adding time');
            // this.timer_status.update({ time: 600000 });

          }
        },
        {
          text: 'Add new person',
          handler: () => {
            this.addUser();
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