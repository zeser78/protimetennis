import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user";
import { throwMatDialogContentAlreadyAttachedError } from "@angular/material";
import { AngularFireAuth } from "@angular/fire/auth";
import { switchMap } from "rxjs/operators";
// import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;
  user$: Observable<User>;

  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    // this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = !!authStatus;
    //   console.log("auth header inside => " + this.isAuth);
    // });
  }

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(
    //   authStatus => {
    //     this.isAuth = !!authStatus;
    //     console.log("auth header inside => " + this.isAuth);
    //   }
    // );

    this.afAuth.authState.subscribe(user => {
      if (user) {
        return (this.isAuth = true);
      } else {
        return (this.isAuth = false);
      }
    });
  }

  onToggleSidenav() {
    // this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
