import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookingComponent } from "./booking/booking.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AdminComponent } from "./admin/admin/admin.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: "admin", component: AdminComponent },
  // { path: "booking", component: BookingComponent },
  // { path: "booking/:id", canActivate: [AuthGuard], component: AdminComponent },
  {
    path: "login",
    component: LoginComponent
  },
  { path: "signup", component: SignupComponent },
  { path: "**/**", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
