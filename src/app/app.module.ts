import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import {CrTimerComponent} from '../components/cr-timer/cr-timer';

import { AngularFireModule } from 'angularfire2';

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
    AboutPage,
    CrTimerComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
