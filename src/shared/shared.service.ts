import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
    getUserDetails(){
        const userData:any = sessionStorage.getItem('userdetails')
        return JSON.parse(userData)
    }
}