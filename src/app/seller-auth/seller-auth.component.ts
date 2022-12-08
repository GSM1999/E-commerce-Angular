import { SignUp } from './../../data-type';
import { SellerService } from './../services/seller.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-seller-auth',
   templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  sellersignup : FormGroup;
  constructor(private seller:SellerService, private router:Router) { }
  showLogin = false;
  authError: string= '';
  ngOnInit(): void {
    this.seller.reloadseller()
  
  this.sellersignup = new FormGroup({
    'name' : new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(5)]),
    'email' : new FormControl('',[Validators.required,Validators.email]),
    'password' : new FormControl('',[Validators.required,Validators.minLength(8)])
  })
}
  get name(){
    return this.sellersignup.get('name')
  }
  get email(){
    return this.sellersignup.get('email')
  }
  get password(){
    return this.sellersignup.get('password')
  }
  signUp(data : SignUp) : void{
     
 this.seller.userSignUp(data)


  }
  
login(data : SignUp) : void{
  this.authError = " ";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
if(isError){
  this.authError = "Email or password is incorrect"
}
    })
   } 

  openLogin(){
this.showLogin=true
  }
  openSignUp(){
     this.showLogin=false
  }
}
