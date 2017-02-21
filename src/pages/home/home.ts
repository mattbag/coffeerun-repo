import { Component } from '@angular/core';
import { ModalController, NavController, ActionSheetController, Events } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { EditItemPage } from '../edit-item/edit-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { AboutPage } from '../about/about';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public oneDeleted: boolean;
  public items = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public dataService: Data,
    public actionSheetCtrl: ActionSheetController,
  ) {

    this.dataService.getData().then((todos) => {

      if (todos) {
        this.items = JSON.parse(todos);
      }

    });

  }

startRun(){
  console.log('Coffee run start');
}
  addItem() {

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

      if (item) {
        this.saveItem(item);
      }

    });

    addModal.present();

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
    item.isDone = false;
    this.dataService.save(this.items);
  }
  saveItem(item) {
    this.items.push(item);
    this.dataService.save(this.items);
  }
   updateItem(item) {
     console.log(item);
     
    this.items[item.index]=item;
    this.dataService.save(this.items);
  }
  removeItem(item) {
    let index = this.items.indexOf(item);
    //  console.log(index);
    this.items.splice(index, 1);
    this.dataService.save(this.items);
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
        if (!this.items[index].isDone) {
          this.items[index].isDone = true;
          this.dataService.save(this.items);
        }

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
          }
        },
        {
          text: 'Cancel Run',
          // role: 'destructive',
          handler: () => {
            console.log('Cancel run');
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