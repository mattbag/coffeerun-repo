import { Component } from '@angular/core';
import { ModalController, NavController, ActionSheetController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
// import { EditItemPage } from '../edit-item/edit-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { AboutPage } from '../about/about';
// import { Data } from '../../providers/data';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];
  public addModal = this.modalCtrl.create(AddItemPage);
  public timer: any;
  public running: boolean = false;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    // public dataService: Data,
    public actionSheetCtrl: ActionSheetController,
  ) {

    // Observable.interval(1000)
    //         .map((x) => x+1)
    //         .subscribe((x) => {
    //           this.timer = (60 * 5 - x) *1000;
    //         })


  }
  ionViewDidLoad() {
    // if user has no coffee and there is time, pop open this
    // this.addModal.present();
  }
  startTimer() {
    Observable.interval(1000)
      .map((x) => x + 1)
      .subscribe((x) => {
        this.timer = (60 * 5 - x) * 1000;
        if (this.timer === 0) {
          console.log('time over');
          this.running = false;
        }
      })
  }
  startRun() {
    // console.log('Coffee run start');
    this.running = true;
    this.startTimer();
  }
  addItem() {

    this.addModal.onDidDismiss((item) => {

      // if (item) {
      //   this.saveItem(item);
      // }

    });

    this.addModal.present();

  }


  // editItem(item,index) {

  //   let editModal = this.modalCtrl.create(EditItemPage, {item: item, index: index});

  //   editModal.onDidDismiss((item) => {
  //       console.log(item);
  //     if (item) {
  //       console.log('quak');

  //       this.updateItem(item);
  //     }

  //   });

  //   editModal.present();

  // }
  uncheck(item) {

  }
  saveItem(item) {

  }
  updateItem(item) {
    console.log(item);


  }
  removeItem(item) {

  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
  // logDrag(event) {
  //   console.log(event);
  // }
  ondrag(event, item, index) {
    let percent = event.getSlidingPercent();
    // let index = this.items.indexOf(item);
    // console.log(event +" "+ item +" "+ index);
    // console.log(event);
    // console.log(item);
    // console.log("index " + index);
    if (percent > 0) {
      // positive
      // console.log('right side');

      // console.log(percent);
      if (percent > 1) {
        // this.removeItem(item);
        setTimeout(() => {
          event.close();
        }, 1500)
      }
      // if (percent > 1 && !this.oneDeleted) {
      //   this.oneDeleted = true;
      //   console.log(index);
      //   // let cacheIndex = index;
      //   // let index2 = this.items.indexOf(item);
      //   //  console.log(index2);

      //   // setTimeout(() => { 
      //     // event.close();
      //     // this.items.splice(index, 1);
      //     this.dataService.save(this.items);
      //     console.log('deleted ' + index);
      //   this.oneDeleted = false;
      //   // }, 300)

      // } else {
      //   event.close();
      // }
      //end if
    } else {
      // negative
      // console.log('left side');
      // console.log(item);
      if (percent < -1) {
        // console.log(this.items[index]);
        // if (!this.items[index].isDone) {
        //   // this.items[index].isDone = true;
        //   // this.dataService.save(this.items);
        // }

        setTimeout(() => {
          event.close();
        }, 500)

        //  console.log(this.items);
      }


    }
    // if (Math.abs(percent) > 1) {
    //  let index = this.items.indexOf(item);
    //   //  console.log(index);
    //   this.items.splice(index,1);
    //   this.dataService.save(this.items);
    // }
  }
  // shareList(){
  //   console.log('hello');

  // }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'More Actions',
      buttons: [
        {
          text: 'Restart Timer',
          // role: 'destructive',
          handler: () => {
            console.log('Retsart timer');
            this.running = false;
            this.timer = 0;
            this.startTimer();
          }
        },
        {
          text: 'Cancel Run',
          // role: 'destructive',
          handler: () => {
            console.log('Cancel run');
            this.running = false;
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