// import { Injectable } from "@angular/core";
// import { Subject } from "rxjs";
// import { AngularFireAuth } from "@angular/fire/auth";
// import { Router } from "@angular/router";

// import { User } from "./user.model";
// import { AuthData } from "./auth-data.model";

// @Injectable()
// export class AuthService {
//   authChange = new Subject<boolean>();
//   private isAuthenticated = false;

//   constructor(private router: Router, private afAuth: AngularFireAuth) {}

//   registerUser(authData: AuthData) {
//     this.afAuth.auth
//       .createUserWithEmailAndPassword(authData.email, authData.password)
//       .then(result => {
//         console.log("register" + result);
//         this.Authsuccesfully();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   login(authData: AuthData) {
//     this.afAuth.auth
//       .signInWithEmailAndPassword(authData.email, authData.password)
//       .then(result => {
//         console.log("done" + result);
//         this.Authsuccesfully();
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

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
// }
