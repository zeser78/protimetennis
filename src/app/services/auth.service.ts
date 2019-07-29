import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, Subject, BehaviorSubject } from "rxjs";
import { Store } from "@ngrx/store";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";
import { User } from "../models/user";
import { AuthData } from "../models/auth-data";
import * as fromApp from "../app.reducer";
import { AUTH_HEADER, NOAUTH_HEADER } from "../app.actions";

export interface UserForm {
  name: string;
  displayName: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<User>;
  authChange = new Subject<boolean>();
  //   private isAuthenticated = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private store: Store<{ ui: fromApp.State }>
  ) {
    // This gave us auth for past-booking component
    this.getUser();
    // if (this.getUser != null) {
    //   this.store.dispatch({ type: AUTH_HEADER });
    //   console.log("time time ");
    // } else {
    //   this.store.dispatch({ type: NOAUTH_HEADER });
    // }
  }

  getUser() {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.store.dispatch({ type: AUTH_HEADER });
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return (
      this.updateUserData(credential.user),
      this.getUser(),
      console.log(
        "credential => " + credential.user
        // this.updateUserData +
        // this.updateUserData(credential.user)
      ),
      // this.authChange.next(true),
      this.store.dispatch({ type: AUTH_HEADER }),
      this.router.navigate(["/admin/activities"])
    );
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.store.dispatch({ type: NOAUTH_HEADER });
    // this.authChange.next(false);
    return this.router.navigate(["/"]);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }

  async login(authData: AuthData) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    );
    return (
      this.store.dispatch({ type: AUTH_HEADER }),
      // this.authChange.next(true),
      this.updateUserData(credential.user),
      this.router.navigate(["/admin"])
    );
  }

  // getAuth() {
  //   return this.afAuth.authState.pipe(
  //     map(
  //       auth => auth,
  //       console.log("this auth => " + )
  //     )
  //   );
  // }

  logout() {
    this.afAuth.auth.signOut();
    // this.authChange.next(false);
    this.store.dispatch({ type: NOAUTH_HEADER }),
      this.router.navigate(["/login"]);
  }

  registerUser(authData: AuthData, userForm: UserForm) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(credential => {
        // userForm;
        credential.user.updateProfile({ displayName: userForm.displayName });
        this.updateUserDataRegister(credential.user, userForm);
        console.log(credential.user);
        this.getUser();
        // this.authChange.next(true);
        this.store.dispatch({ type: "AUTH_HEADER" });
        this.router.navigate(["/login"]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  private updateUserDataRegister(user, userForm: UserForm) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log(userForm.displayName);
    const data = {
      uid: user.uid,
      name: userForm.name,
      email: user.email,
      lastName: userForm.displayName
    };

    return (
      userRef.set(data, { merge: true }), console.log(userForm.displayName)
    );
  }
}
