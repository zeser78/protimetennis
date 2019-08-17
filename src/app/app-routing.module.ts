import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookingComponent } from "./booking/booking.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AdminComponent } from "./admin/admin/admin.component";
import { AuthGuard } from "./services/auth.guard";
import { PastBookingComponent } from "./booking/past-booking/past-booking.component";
import { NewBookingComponent } from "./booking/new-booking/new-booking.component";
import { EditBookingComponent } from "./booking/edit-booking/edit-booking.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "admin",
    canActivate: [AuthGuard],
    component: AdminComponent,

    children: [
      { path: "", redirectTo: "activities", pathMatch: "full" },
      { path: "activities", component: PastBookingComponent },
      { path: "new-booking", component: NewBookingComponent },
      { path: "booking/:id", component: EditBookingComponent }
    ]
  },
  // { path: "booking", component: BookingComponent },
  // { path: "booking/:id", canActivate: [AuthGuard], component: AdminComponent },
  {
    path: "login",
    component: LoginComponent
  },
  // { path: "signup", component: SignupComponent },
  { path: "**/**", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
