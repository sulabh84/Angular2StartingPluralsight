import {Component , OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector : 'pm-products',
    templateUrl : './product-list.component.html',
    styleUrls : ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    
    pageTitle:String = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    _listFilter: string;
    errorMessage : string;
    constructor(private _productService : ProductService){   
    }

    onRatingClicked(message : string) : void {
        this.pageTitle = "Product list: " + message;
    }
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter=value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    performFilter(filterBy:string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product : IProduct) => 
                                        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
    }

    filteredProducts : IProduct[];
    products : IProduct[] = [];
    toggelImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit() : void{
        console.info("In OnInit");
        this._productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            errorMessage => this.errorMessage = <any>errorMessage
        );
        // this.listFilter = 'cart';
    }
}