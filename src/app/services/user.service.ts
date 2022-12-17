import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SignUp, login } from './../../data-type';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
invalidUser = new EventEmitter<boolean>(false)
  constructor(private http : HttpClient, private router:Router) { }
  userSignUp(user:SignUp){
this.http.post("http://localhost:3000/users",user,{observe:'response'}).subscribe((result)=>{
  if(result){
    localStorage.setItem('user',JSON.stringify(result.body))
    this.router.navigate(['/'])
  }
})
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
  userLogin(data:login){
this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result)=>{
  if(result && result.body?.length){
    this.invalidUser.emit(false)
    localStorage.setItem('user',JSON.stringify(result.body[0]));
    this.router.navigate(['/'])
  }
  else{
this.invalidUser.emit(true)
  }
})
}
}
