import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { MaterialModule } from "./material/material.module";

import { FirestoreDatePipe } from "./booking/past-booking/timestamp.pipe";
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
import { AdminComponent } from "./admin/admin/admin.component";
import { DialogComponent } from "./booking/past-booking/dialog.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "src/environments/environment";
import { EditBookingComponent } from "./booking/edit-booking/edit-booking.component";
import { appReducer } from "./app.reducer";

@NgModule({
  declarations: [
    AppComponent,
    NewBookingComponent,
    BookingComponent,
    PastBookingComponent,
    HeaderComponent,
    SidenavComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    DialogComponent,
    FirestoreDatePipe,
    EditBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ ui: appReducer }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {}
