import { Subscription } from 'rxjs/Subscription';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription: Subscription;
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {

    this.subscription = this.productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = this.category ?
        this.products.filter(p => p.category === this.category) :
        this.products;
      });
  }

  ngOnInit() {
  }

  private filter(category: string) {
    const result = this.category ?
    this.products.filter(p => p.category === this.category) :
      this.products;
    return result;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
