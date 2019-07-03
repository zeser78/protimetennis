import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";

import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from "./app.component";
import { NewBookingComponent } from "./booking/new-booking/new-booking.component";
import { BookingComponent } from "./booking/booking.component";
import { PastBookingComponent } from "./booking/past-booking/past-booking.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavComponent } from "./navigation/sidenav/sidenav.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";

@NgModule({
  declarations: [
    AppComponent,
    NewBookingComponent,
    BookingComponent,
    PastBookingComponent,
    HeaderComponent,
    SidenavComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
