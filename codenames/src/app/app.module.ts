import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { CardComponent } from './card/card.component';
import { BoardComponent } from './board/board.component';
import { SigninComponent } from './signin/signin.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { GamePageComponent } from './game-page/game-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameListComponent } from './game-list/game-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    BoardComponent,
    SigninComponent,
    GamePageComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
