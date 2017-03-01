import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { AuthService } from '../../providers/auth-service';
import { AuthStorage } from '../../providers/auth-storage';
import { AngularFire } from 'angularfire2';



/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, 
    af: AngularFire, 
    private _auth: AuthService, 
    private _authStore: AuthStorage) {
    // this.items = af.database.list('/items');
    // console.log('auth? '+ this._auth.authenticated);
    // console.log(this._authStore.checkLogin());
    setTimeout(() => {
      this._authStore.checkLogin().then((loggedIn) => {
        console.log('Logged in storage? ' + loggedIn);
        if (loggedIn) {
          console.log('Logged in from storage');
          this.navCtrl.setRoot(HomePage);
        }
      }) // end promise
    }, 0)


  }// end constructor


  signInWithGoogle(): void {
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    // console.log("Google display name ", this._auth.displayName());
    // console.log("Google display name ", this._auth.storeAuthUser());
    this._auth.saveLoginToken();
    this._auth.storeAuthUser()
    // console.log(this._auth);
    
    this.navCtrl.setRoot(HomePage);
    // this.navCtrl.push(HomePage);
  }

}
