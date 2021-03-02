import { Injectable } from '@angular/core';

import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallback: () => any , cancelCallback: () => any) {
    alertify.confirm('Confirmacion' , message  , (e: any) => {
      if (e) {
        okCallback();
      }
    } , (e: any) => {
      if (e) {
        cancelCallback();
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
