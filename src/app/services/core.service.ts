import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackService:MatSnackBar) { }
  OpenSnackBar(message:string,action:any){
    this._snackService.open(message,action,{duration:3000,verticalPosition:'top'})
  }

}
