import { ProductService } from './../services/product.service';
import { UserService } from './../services/user.service';
import { login, SignUp, product,cart } from './../../data-type';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
showLogin:boolean = true
authError:string=" "
  constructor(private user:UserService, private product:ProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }
signUp(data : SignUp){
this.user.userSignUp(data)
}
login(data:login){
this.user.userLogin(data)
this.user.invalidUser.subscribe((result)=>{
  if(result){
    this.authError="User not Found"
  }else{
    this.localCartToRemoteCart()
  }
})
}
openSignUp(){
  this.showLogin=false
}
openLogin(){
this.showLogin=true
}
localCartToRemoteCart(){
let data=localStorage.getItem('localCart')
let user=localStorage.getItem('user')
let userId = user && JSON.parse(user).id
if(data){
  let cartDataList : product[]= JSON.parse(data)
  cartDataList.forEach((product : product,index) => {
    let cartData : cart = {
      ...product,
      productId:product.id,
      userId
    }
    delete cartData.id
    setTimeout(()=>{
      this.product.addToCart(cartData).subscribe((result)=>{
        if(result){
          
        }
      })
    },500)
    if(cartDataList.length===index+1){
      localStorage.removeItem('localCart')
    }
  });
}
setTimeout(()=>{
  this.product.getCartList(userId)
},2000)
}

}

