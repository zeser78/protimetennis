import { formatDate } from "@angular/common";
import { Inject, LOCALE_ID, Pipe, PipeTransform } from "@angular/core";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;

@Pipe({
  name: "firestoreDate"
})
export class FirestoreDatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(timestamp: Timestamp, format?: string): string {
    return formatDate(timestamp.toDate(), format || "short", this.locale);
    // return formatDate(timestamp.toDate(), format || "short", this.locale);
    // return formatDate(timestamp.toDate(), | Date, format, this.locale);
  }
}
