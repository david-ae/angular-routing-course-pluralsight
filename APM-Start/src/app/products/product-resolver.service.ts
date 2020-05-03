import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved>{

    constructor(private productService: ProductService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProductResolved | Observable<ProductResolved> | Promise<ProductResolved> {
        const id = route.paramMap.get('id');
        if(isNaN(+id)){
            const message = `Product id was not a number: ${id}`;
            console.error(message);
            return of({product: null, error: message});
        }
        return this.productService.getProduct(+id)
        .pipe(
            map(product => ({product: product})),
            catchError(error => {
                const message = `Retrieval error: ${error}`;
                console.error(message);
                return of({product: null, error: message});
            })
        );
    }
}