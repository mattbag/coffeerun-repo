import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
// import 'rxjs/add/operator/map';

/*
  Generated class for the AuthStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthStorage {

  constructor(public storage: Storage) {
    // console.log('Hello AuthStorage Provider');
  }

   checkLogin() {
    return this.storage.get('isLoggedIn');  
  }
 
  saveLoginToken(user){
    // let newData = JSON.stringify(data);
    // this.storage.set('todos', newData);
    this.storage.set('isLoggedIn', true);
    // this.storage.set('logged_user',{
    //   name: user.name
    // })
    // console.log(newData);
  }
  removeLoginToken(){
    // let newData = JSON.stringify(data);
    // this.storage.set('todos', newData);
    this.storage.set('isLoggedIn', false);
    // console.log(newData);
  }

}
