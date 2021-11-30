import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider);
  }

  AuthLogin(provider) {
     return this.afAuth.signInWithPopup(provider)
     .then((result) => {
       console.log('Success');
     }).catch((error) => {
       console.log('Error');
     })
  }
}
