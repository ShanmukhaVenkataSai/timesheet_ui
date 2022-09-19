import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
    constructor(private snackBar: MatSnackBar,){

    }
    getUserDetails(){
        const userData:any = sessionStorage.getItem('userdetails')
        return JSON.parse(userData)
    }

    openSnackBar(
        message: string,
        action: string | undefined,
        type:string,
        duration:number=2000,
      ) {
        const snackbarConfig = new MatSnackBarConfig();
        snackbarConfig.panelClass = type=='success' ? 'snack-success-msg' : 'snack-failure-msg';
        snackbarConfig.duration = duration;
        this.snackBar.open(message, action, snackbarConfig);
      }
}