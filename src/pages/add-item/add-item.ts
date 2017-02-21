import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ToastController } from 'ionic-angular';
// import { Camera } from 'ionic-native';


/*
  Generated class for the AddItem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {
  title: string;
  description: string;
  isDone: boolean;
  
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public view: ViewController,
  public toast: ToastController
  ) {}


 presentToast() {
    let toast = this.toast.create({
      message: 'I need a title here!',
      duration: 3000,
      position: 'top',

    });
    toast.present();
  }

 close(){
   this.view.dismiss();
 }
}
