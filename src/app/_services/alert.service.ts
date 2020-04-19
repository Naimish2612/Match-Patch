import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  Confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallback();
      }
      else { }
    }).setHeader('Match-Patch');
  }

  Success(message: string) {
    alertify.success(message);
  }

  Error(message: string) {
    alertify.error(message);
  }

  Warning(message: string) {
    alertify.warning(message);
  }

  Message(message: string) {
    alertify.message(message);
  }

}
