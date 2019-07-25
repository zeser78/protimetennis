import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, map, take } from "rxjs/operators";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user$.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        } else {
          return this.router.createUrlTree(["/login"]);
        }
      })
      // user => user
      // tap(loggedIn => {
      //   if (!loggedIn) {
      //     console.log("access denied");
      //     this.router.navigate(["/login"]);
      //   }
      // })
      // )
      // }
    );
  }
}
