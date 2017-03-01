import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../home/home';
import { AuthService } from '../../providers/auth-service';
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

   constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService) {
    // this.items = af.database.list('/items');
    console.log(this._auth.authenticated);
    
    if(this._auth.authenticated){
console.log('yep');

    }
  }

  signInWithGoogle(): void {
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("Google display name ",this._auth.displayName());
    this.navCtrl.setRoot(HomePage);
    // this.navCtrl.push(HomePage);
  }

}
