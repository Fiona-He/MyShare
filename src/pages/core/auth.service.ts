import { Injectable } from "@angular/core";
import { Platform,LoadingController } from 'ionic-angular';

import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import { Md5 } from "ts-md5/dist/md5";
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>;

  authState: any = null;
  loader: any;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private facebook: Facebook,
    public gplus: GooglePlus,
    private platform: Platform,
    public loadingCtrl: LoadingController
  ) {
    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
    this.afAuth.authState.subscribe(data => this.authState = data)
  }

  get authenticated(): boolean {
    return this.authState !== null
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null
  }

  get currentUserPhotoURL(): string {
    return this.authenticated ? this.authState.photoURL : null
  }

  get currentUserDisplayName(): string {
    return this.authenticated ? this.authState.displayName : null
  }

  get currentUserEmail(): string {
    return this.authenticated ? this.authState.email : null
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then( credential => {
        console.log(credential);
        this.updateUserData(credential.Mb);
      })
      .catch(error => console.log(error.message));
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.updateUserData(user))
      .then(() => console.log("Welcome, your account has been created!"))
      .then(user => {
        this.afAuth.auth.currentUser
          .sendEmailVerification()
          .then(() => console.log("We sent you an email verification"))
          .catch(error => console.log(error.message));
      })
      .catch(error => console.log(error.message));
  }

  resetPassword(email: string) {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => console.log("We've sent you a password reset link"))
      .catch(error => console.log(error.message));
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      console.log("logout!");
    });
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      return this.nativeGoogleLogin();
    }else {
      const provider = new firebase.auth.GoogleAuthProvider()
      return this.socialLogin(provider)
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '949618300632-comsf1ninrnkcsat4m2ifjr2i9naus70.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })

      return await firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)).then(
        user =>{
          this.updateUserData(user);
        })
    } catch(err) {
      console.log(err);
    }
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialLogin(provider)
  }

  facebookLogin() {
    if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        console.log(res.status);
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential).then(
          user => {
            this.updateUserData(user);
          });
      }).catch(
        error => {
          console.log(error);
        }
      )
    }
    else {
      const provider = new firebase.auth.FacebookAuthProvider()
      return this.socialLogin(provider)
    }
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialLogin(provider)
  }

  private socialLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
        .then(credential => {
          this.updateUserData(credential.user);
          console.log(credential);
        })
        .catch(error => console.log(error.message))
  }

  getUser(userid) {
    return this.afs.doc<User>(`users/${userid}`).valueChanges();
  }

  updateProfileData(displayName: string, photoURL: string) {
    const user = this.authState;
    const data = { displayName, photoURL };
    return user
      .updateProfile(data)
      .then(() =>
        this.afs.doc(`users/${user.uid}`).update({ displayName, photoURL })
      )
      .then(() => console.log("Your profile has been updated!"))
      .catch(error => console.log(error.message));
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log("point a");
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName,
      photoURL:
        user.photoURL ||
        "https://www.gravatar.com/avatar/" +
          Md5.hashStr(user.uid) +
          "?d=identicon"
    };
    console.log("point b");
    this.afAuth.auth.currentUser.updateProfile({
      displayName: data.displayName,
      photoURL: data.photoURL,
    });
    console.log("point c");
    //user.photoURL = data.photoURL;
    console.log(user);
    console.log(data);
    return userRef.set(data, { merge: true });
  }

  presentLoadingCustom() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <img src="./assets/imgs/loading.gif" width="80">
      </div>`,
      cssClass: 'loadingwrapper'
    });

    this.loader.present();
  }
}
