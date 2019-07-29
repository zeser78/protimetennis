import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

import { Router } from "@angular/router";

// import { auth } from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { switchMap } from "rxjs/operators";
import { Observable, of, Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user";

export interface UserForm {
  name: string;
  displayName: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  userForm: UserForm;

  // loginForm: FormGroup;
  // email: string = "testfb3@test.com";
  // password: string = "123456";
  constructor(public auth: AuthService, router: Router) {}

  ngOnInit() {
    // this.loginForm = new FormGroup({
    //   email: new FormControl("", {
    //     validators: [Validators.required, Validators.email]
    //   }),
    //   password: new FormControl("", { validators: [Validators.required] })
    // });
  }

  // onSubmit() {
  //   this.auth.login(this.email, this.password);
  //   console.log(this.email);
  //   // this.auth.login({
  //   //   email: this.loginForm.value.email,
  //   //   password: this.loginForm.value.password
  //   // });
  // }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const name = form.value.name;
    const displayName = form.value.name;
    // const password = form.value.password;
    if (this.isLoginMode) {
      console.log(form.value);
      this.auth.login({
        email: form.value.email,
        password: form.value.password
      });
      form.reset();
    } else {
      this.auth.registerUser(
        {
          email: form.value.email,
          password: form.value.password
        },
        (this.userForm = { name: name, displayName: displayName })
      );
      this.isLoginMode = true;

      console.log(name, displayName);
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
