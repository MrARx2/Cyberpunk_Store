import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import { AdminService } from 'src/app/services/admin.service';
import { ProductsService } from 'src/app/services/products.service';
import PopupMessages from 'src/app/Utils/PopupMessages';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public allProducts: Product[];

  constructor(
    private productsService: ProductsService,
    public adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.allProducts = new Array<Product>();

    this.productsService.allProductsChange.subscribe((value: Product[]) => {
      this.allProducts = value;
      console.log(this.allProducts);
    })
    this.checkIfShouldGetAllProducts();
  }

  // -------------------------------------------------------------------------------- Model

  /**
   * gets all the products from the server
  */
  public getAllProductsFromServer = (): void => {
    const observable = this.productsService.getAllProducts();

    observable.subscribe((succesfulServerResponse: Product[]) => {
      // updating the value in the service, letting it know we recieved the products
      this.productsService.allProductsChange.next(succesfulServerResponse);
      this.allProducts = succesfulServerResponse;

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

  // -------------------------------------------------------------------------------- Controller

  /**
   * checks whether should get the products from the server
  */
  private checkIfShouldGetAllProducts = (): void => {
    // if there aren't any products in the products service, get them from the server
    if (this.productsService.allProducts === undefined) {
      this.getAllProductsFromServer();
    }
    else {
      this.allProducts = this.productsService.allProducts;
    }
  }

  /**
   * this function is called whenever the 'add product' button is clicked
  */
  public onAddNewProductClick = (): void => {
    // updating the service
    this.adminService.isShowProductAdditionSectionChange.next(true);
  }

}
