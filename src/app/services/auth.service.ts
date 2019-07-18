import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable, of, Subject } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { User } from "../models/user";
import { AuthData } from "../models/auth-data";

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
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUser() {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
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
      this.authChange.next(true),
      this.router.navigate(["/admin"])
    );
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.authChange.next(false);
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

  //   login(email: string, password: string) {
  //     return new Promise((resolve, reject) => {
  //       this.afAuth.auth
  //         .signInWithEmailAndPassword(email, password)
  //         .then(userData => resolve(userData), err => reject(err));
  //       this.router.navigate(["/"]);
  //     });
  //   }

  async login(authData: AuthData) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    );
    return (
      this.authChange.next(true),
      this.updateUserData(credential.user),
      this.router.navigate(["/admin"])
    );
  }

  //   login(authData: AuthData) {
  //     this.afAuth.auth
  //       .signInWithEmailAndPassword(authData.email, authData.password)
  //       .then(result => {
  //         console.log("done" + result);
  //         this.getUser();
  //         this.getUser(), this.router.navigate(["/admin"]);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }

  //   private updateUserDataEmail(user) {
  //     // Sets user data to firestore on login
  //     const userRef: AngularFirestoreDocument<User> = this.afs.doc(
  //       `users/${user.uid}`
  //     );
  //     const data = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName
  //     };

  // return userRef.set(data, { merge: true });
  //   }

  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authChange.next(false);
    this.router.navigate(["/login"]);
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(credential => {
        this.updateUserDataRegister(credential.user);
        console.log("register" + credential.user.uid);
        this.getUser();

        this.router.navigate(["/login"]);
        //   this.Authsuccesfully();
      })
      .catch(error => {
        console.log(error);
      });
  }

  private updateUserDataRegister(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }

  //   logout() {
  //     this.authChange.next(false);
  //     this.router.navigate(["/login"]);
  //   }

  //   // getUser() {
  //   //   return { ...this.user };
  //   // }

  //   isAuth() {
  //     return this.isAuthenticated;
  //   }

  //   private Authsuccesfully() {
  //     this.isAuthenticated = true;
  //     this.authChange.next(true);
  //     this.router.navigate(["/booking"]);
  //   }

  //   registerUser(authData: AuthData) {
  //     this.uiService.loadingStateChanged.next(true);
  //     this.afAuth.auth
  //       .createUserWithEmailAndPassword(authData.email, authData.password)
  //       .then(result => {
  //         this.uiService.loadingStateChanged.next(false);
  //       })
  //       .catch(error => {
  //         this.uiService.loadingStateChanged.next(false);
  //         this.uiService.showSnackbar(error.message, null, 3000);
  //       });
  //   }

  //   login(authData: AuthData) {
  //     this.uiService.loadingStateChanged.next(true);
  //     this.afAuth.auth
  //       .signInWithEmailAndPassword(authData.email, authData.password)
  //       .then(result => {
  //         this.uiService.loadingStateChanged.next(false);
  //       })
  //       .catch(error => {
  //         this.uiService.loadingStateChanged.next(false);
  //         this.uiService.showSnackbar(error.message, null, 3000);
  //       });
  //   }
}
