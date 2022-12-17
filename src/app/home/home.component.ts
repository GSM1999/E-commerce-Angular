import { ProductService } from './../services/product.service';
import { product } from './../../data-type';

import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
popularProducts: undefined|product[]
trendyProducts: undefined|product[]
  constructor(private product:ProductService) { }

  ngOnInit(): void {
this.product.popularProducts().subscribe((data)=>{
  this.popularProducts=data
})
this.product.trendyProduct().subscribe((data)=>{
  this.trendyProducts=data
})
  }

}
