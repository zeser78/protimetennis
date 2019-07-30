import { Injectable } from "@angular/core";
import { Client } from "../models/client";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clients: Client[];

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.clientsCollection = afs.collection<Client>("clients");
  }

  addClient(client: Client) {
    this.clientsCollection.add(client);
  }
}
