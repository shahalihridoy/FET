import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authState: any = null;
  user: any = {};

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth

    });

  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) { return 'Guest' }
    else if (this.currentUserAnonymous) { return 'Anonymous' }
    else { return this.authState['displayName'] || 'User without a Name' }
  }

  // Return current user photoUrl
  get photoUrl(): string {
    if (!this.authState) { return "assets/boss-baby.jpg" }
    else return this.authState['photoURL']
  }

  //// Social Auth ////

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user;
        this.updateUserData();
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log(error);
      });
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    if (this.authenticated) {
      this.router.navigate(['/']);
    }
    else {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.router.navigate(['/'])
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }


  //// Helpers ////

  private updateUserData(): void {

    let path = "user/"; // Endpoint on firebase
    let data = {
      "name": this.authState.displayName,
      "photoUrl": this.photoUrl
    }

    this.db.list(path).set(this.currentUserId, data)
      .catch(error => console.log(error));

  }


  public updateProfile(name, photo): boolean {

    let check = false;
    if(this.authenticated){
      this.authState.updateProfile({
      "displayName": name,
      "photoURL": photo
    }).then(e=>{check = true})
  }
    return check;
  }


}

