import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ToastController } from 'ionic-angular';
// import { Camera } from 'ionic-native';

/*
  Generated class for the AddItem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html'
})
export class EditItemPage {
  title: string;
  description: string;
  isDone: boolean;
  img: string ;
  index: boolean;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController,public toast: ToastController) {
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;
    this.isDone = this.navParams.get('item').isDone;
    this.img = this.navParams.get('item').img;
    this.index = this.navParams.get('index');
  }
   presentToast() {
    let toast = this.toast.create({
      message: 'Don\'t remove the title!',
      duration: 3000,
      position: 'top',

    });
    toast.present();
  }
updateItem(){
    let updatedItem = {
      // id: UUID.UUID(),
      title: this.title,
      description: this.description,
      isDone: this.isDone,
      img: this.img,
      index: this.index
    };
    if(this.title){
     this.view.dismiss(updatedItem);
    }else{
     this.presentToast();
    }
    
    // console.log(updatedItem);
    
  }
 close(){
   this.view.dismiss();
 }


// accessGallery(){
//    Camera.getPicture({
//      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
//      destinationType: Camera.DestinationType.DATA_URL
//     }).then((imageData) => {
//       this.img = 'data:image/jpeg;base64,'+imageData;

//      }, (err) => {
//       console.log(err);
//     });
//   }
//   saveItem(){
//     let newItem = {
//       // id: UUID.UUID(),
//       title: this.title,
//       description: this.description,
//       isDone: false,
//       img: this.img
//     };
//     this.view.dismiss(newItem);
//   }
//  close(){
//    this.view.dismiss();
//  }
}
