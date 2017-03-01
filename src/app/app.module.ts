import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import {CrTimerComponent} from '../components/cr-timer/cr-timer';

import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';

export const firebaseConfig = {
   apiKey: "AIzaSyDLIF2G_wIdg1jf8jI1xRzRMhnQlxRlekY",
    authDomain: "coffeerun-71f8f.firebaseapp.com",
    databaseURL: "https://coffeerun-71f8f.firebaseio.com",
    storageBucket: "coffeerun-71f8f.appspot.com",
    messagingSenderId: "896598987117"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage,
    CrTimerComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AboutPage,
    CrTimerComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
