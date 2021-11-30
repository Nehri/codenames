import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';
<<<<<<< HEAD
import { SigninComponent } from './signin/signin.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
=======
import { GameComponent } from './game/game.component';
>>>>>>> c6bb969 (adding game component nd route)

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    BoardComponent,
<<<<<<< HEAD
    SigninComponent,
=======
    GameComponent
>>>>>>> c6bb969 (adding game component nd route)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
