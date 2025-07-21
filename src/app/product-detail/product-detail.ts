import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product = {
    id: 1,
    name: 'Laptop',
    price: 1000,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw7p2GSN6YX1Pt-SgBbxQ1bwFNkP3jyBsnOA&s',
    inStock: true,
  };

  productId: string | null = null;
  search: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.search = this.route.snapshot.queryParamMap.get('search');
    // this.route.paramMap.subscribe((params) => {
    //   this.productId = params.get('id');
    // });
    // this.route.queryParamMap.subscribe((params) => {
    //   this.search = params.get('search');
    // });
  }
}
