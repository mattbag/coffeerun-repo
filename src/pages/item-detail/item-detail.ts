import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
/*
  Generated class for the ItemDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
img: string;
title: string;
description: string;
isDone: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {}

  ionViewDidLoad() {
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;
    this.img = this.navParams.get('item').img;
    this.isDone = this.navParams.get('item').isDone;
  }
  
shareTodo(){
  console.log('sharing...'); 
}
 uncheck(){
   console.log('uncheck fn missing');
   
 }
}
