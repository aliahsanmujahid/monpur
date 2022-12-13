import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from '../_models/product';
import { ProductService } from '../_services/product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailedResolver implements Resolve<IProduct> {

    constructor(private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IProduct> {
        return this.productService.getsingleproduct(route.paramMap.get('id'));
    }

}
