import { ProductService } from './../services/product.service';
import { product } from './../../data-type';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
productData : undefined | product
productQuantity : number = 1 
  constructor(private activeroute :ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let productId=this.activeroute.snapshot.paramMap.get('productId')
productId && this.product.getProduct(productId).subscribe((result)=>{
this.productData=result
})
  }
handleQuantity(val :string){
if(this.productQuantity<5 && val==='plus'){
  this.productQuantity=this.productQuantity + 1
}
else if(this.productQuantity>1 && val==='min'){
  this.productQuantity=this.productQuantity - 1
}
}
}
