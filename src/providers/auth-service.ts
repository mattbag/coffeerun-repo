import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public auth$: AngularFireAuth,public storage: Storage) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  signOut(): void {
    this.auth$.logout();
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.google.displayName;
    } else {
      return '';
    }
  }
  // ====================== local user details
  storeAuthUser() {
    if (this.authState != null) {
      //  this.authState.google;
      let split_name= this.authState.google.displayName.split(' ');
      let username=split_name[2].replace(/["'()]/g,"");
       this.storage.set('AuthUser',{
        //  name:this.authState.google.displayName,
         pic: this.authState.google.photoURL,
         email: this.authState.google.email,
         name: {
           first: split_name[0],
           last: split_name[1],
           username: username
         }
       })
    } else {
      return '';
    }
  }
//=================== local storage tokens =============
   checkLogin() {
    return this.storage.get('isLoggedIn');  
  }
  getUserFromStorage() {
    return this.storage.get('AuthUser').then(user=>{
      return user
    });  
  }
 
  saveLoginToken(){
    // let newData = JSON.stringify(data);
    // this.storage.set('todos', newData);
    this.storage.set('isLoggedIn', true);
    
  }
  removeLoginToken(){
    // let newData = JSON.stringify(data);
    // this.storage.set('todos', newData);
    this.storage.set('isLoggedIn', false);
    this.storage.remove('AuthUser').then(() => console.log('Deleted stored user!'))
    // this.storage.clear();
    // console.log(newData);
  }
}