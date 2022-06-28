import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  errorHandling(error: any) {
    if (error.status == 0 || error == null) {
      console.log(error)
      return "Network Error, The network connection to API services is lost";
    }
    else {
        if (error.error.ErrorMessage == undefined || error.error.ErrorMessage == "") {
            return error.error;
        }
        else {
            return error.error.ErrorMessage;
        }
    }
  }
}
