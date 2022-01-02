import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Product from 'src/app/models/Product';
import { AdminService } from 'src/app/services/admin.service';
import { ProductsService } from 'src/app/services/products.service';
import PopupMessages from 'src/app/Utils/PopupMessages';
import ProductsUtils from 'src/app/Utils/ProductsUtils';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  public currentEditableProduct: Product;
  private currentNewProductAfterChanges: Product;
  public isShowProductAdditionSection: boolean;
  public newProducDetails: Product;
  private imageToUpload: any;

  // form variables
  public newProductValues: FormGroup;
  public newNameInput: FormControl;
  public newCategoryInput: FormControl;
  public newAbilityInput: FormControl;
  public newDescriptionInput: FormControl;
  public newDamageInput: FormControl;
  public newPriceInput: FormControl;
  public newImageInput: FormControl;



  constructor(
    private adminService: AdminService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initializeDefinitions();
    this.initializeListeners();
  }

  // -------------------------------------------------------------------------------- Model

  /**
   * this function creates and tries to update the product in the server
  */
  private updateProduct = (): void => {
    // creating the updated product
    const updatedProduct = new Product(this.currentNewProductAfterChanges.ID,
      this.currentNewProductAfterChanges.name,
      this.currentNewProductAfterChanges.description,
      this.currentNewProductAfterChanges.category,
      this.currentNewProductAfterChanges.ability,
      this.currentNewProductAfterChanges.price,
      this.currentNewProductAfterChanges.damage, 
      this.currentNewProductAfterChanges.imageURL);

    try {
      // checking if the product's data is valid
      const isProductDataValid = ProductsUtils.validateProductData(updatedProduct);
      if (isProductDataValid) {
        const observable = this.productsService.updateProduct(updatedProduct);

        observable.subscribe(() => {
          PopupMessages.displaySuccessPopupMessage('The product has been updated!');

        }, badServerResponse => {
          PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
        });
      }
    }
    catch (error) {
      PopupMessages.displayErrorPopupMessage(error);
    }
  }

  /**
 * this function tries to update the product image in the server
 * 
*/
  public updateProductImage = (event?: any): void => {
    // creating the updated product
    const updatedProduct = new Product(this.currentNewProductAfterChanges.ID,
      this.currentNewProductAfterChanges.name,
      this.currentNewProductAfterChanges.description,
      this.currentNewProductAfterChanges.category,
      this.currentNewProductAfterChanges.ability,
      this.currentNewProductAfterChanges.damage,
      this.currentNewProductAfterChanges.price,
      this.currentNewProductAfterChanges.imageURL);

    try {
      // checking if the product's data is valid
      const isProductDataValid = ProductsUtils.validateProductData(updatedProduct);
      if (isProductDataValid) {

        // checking if the file that was inserted is not empty
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          const formData = new FormData();
          formData.append('file', file);

          const imageObservable = this.productsService.addImage(formData);

          imageObservable.subscribe((recievedImageName) => {

            // once the image was uploaded succesfully to the server, update the image name according tot he name recieved from the server's response
            updatedProduct.imageURL = recievedImageName;

            const observable = this.productsService.updateProduct(updatedProduct);

            // attempting to update the product in the server
            observable.subscribe((updatedProductResponse: Product) => {
              // updating the products service with the new products
              this.currentNewProductAfterChanges.imageURL = updatedProductResponse.imageURL;
              PopupMessages.displaySuccessPopupMessage('The product has been updated!');

            }, badServerResponse => {
              PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
            });

          }, badServerResponse => {
            PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
          })
        }
      }
    }
    catch (error) {
      PopupMessages.displayErrorPopupMessage(error);
    }
  }

  /**
 * this function is called when the 'add new product' button is clicked
*/
  public onAddNewProductClick = (): void => {
    this.assignFormControlsValues();
    try {
      // validting the new product's data
      const isProductDataValid = ProductsUtils.validateProductData(this.newProducDetails);
      if (isProductDataValid) {
        const formData = new FormData();
        formData.append('file', this.imageToUpload);

        const imageObservable = this.productsService.addImage(formData);
        imageObservable.subscribe((recievedImageName) => {
          // once the image was uploaded succesfully to the server, update the image name according tot he name recieved from the server's response
          this.newProducDetails.imageURL = recievedImageName;

          // attempting to update the product in the server
          const observable = this.productsService.addProduct(this.newProducDetails);
          observable.subscribe((newProductFromServer: Product) => {

            // updating the products service with the new products
            const allProducts = this.productsService.allProducts;
            allProducts.push(newProductFromServer);
            this.productsService.allProductsChange.next(allProducts);
            this.clearFormInputs();

            PopupMessages.displaySuccessPopupMessage('Product added succesfully !');
          }, badServerResponse => {
            PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
          })

        }, badServerResponse => {
          PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
        })
      }
    }
    catch (error) {
      PopupMessages.displayErrorPopupMessage(error);
    }
  }


  // -------------------------------------------------------------------------------- controller

  /**
   * initializes the definitions of this component
   */
  private initializeDefinitions = (): void => {
    this.newProducDetails = new Product(null, "", "", "", "", null, null, "");
    this.currentEditableProduct = this.adminService.currentEditableProduct;
    this.isShowProductAdditionSection = false;
    this.initializeFormControlsValidations();

    // initiating the current editable product
    if (this.currentEditableProduct !== undefined) {
      this.currentNewProductAfterChanges = new Product(this.currentEditableProduct.ID, this.currentEditableProduct.name, this.currentEditableProduct.description, this.currentEditableProduct.category, this.currentEditableProduct.ability, this.currentEditableProduct.damage, this.currentEditableProduct.price, this.currentEditableProduct.imageURL);
    }
  }

  /**
   * initializes the listeners of this components
   */
  private initializeListeners = (): void => {
    // listening for changes in the indication of displaying the product addition section
    this.adminService.isShowProductAdditionSectionChange.subscribe((value: boolean) => {
      this.isShowProductAdditionSection = value;
    })

    // listening for changes in the admin's current product to be edited
    this.adminService.currentEditableProductChange.subscribe((value: Product) => {
      this.currentEditableProduct = value;
      this.currentNewProductAfterChanges = value;
    });
  }

  /**
   * this function is called after a change in the image input
   * @param event
   */
  public selectImage = (event: any): void => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // updating the class avriable with the file that was inserted to the file input
      this.imageToUpload = file;
    }
  }

  /**
 * assings the component's form control values
 */
  private assignFormControlsValues = (): void => {
    this.newProducDetails.name = this.newNameInput.value;
    this.newProducDetails.category = this.newCategoryInput.value;
    this.newProducDetails.ability = this.newAbilityInput.value;
    this.newProducDetails.description = this.newDescriptionInput.value;
    this.newProducDetails.damage = this.newDamageInput.value;
    this.newProducDetails.price = this.newPriceInput.value;
  }

  /**
   * initializes the form controls validations
  */
  private initializeFormControlsValidations = (): void => {
    this.newNameInput = new FormControl("", [Validators.required]);
    this.newCategoryInput = new FormControl("", [Validators.required]);
    this.newAbilityInput = new FormControl("", [Validators.required]);
    this.newDescriptionInput = new FormControl("", [Validators.required]);
    this.newDamageInput = new FormControl("", [Validators.required]);
    this.newPriceInput = new FormControl("", [Validators.required]);
    this.newImageInput = new FormControl(null, [Validators.required]);

    // creating the form group, containing all the form fields
    this.newProductValues = new FormGroup({
      name: this.newNameInput,
      category: this.newCategoryInput,
      ability: this.newAbilityInput,
      description: this.newDescriptionInput,
      damage: this.newDamageInput,
      price: this.newPriceInput,
      image: this.newImageInput
    });
  }


  // -------------------------------------------------------------------------------- view

  /**
   * displays a modal for editing the product name
   */
  public editProductName = (): void => {
    Swal.fire({
      title: `Set a new name to ${this.currentEditableProduct.name}`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: (newProductName: string) => {
        if (newProductName.trim() !== "") {
          this.currentNewProductAfterChanges.name = newProductName;
          this.updateProduct();
        }
        else {
          PopupMessages.displayErrorPopupMessage("Name can't be empty");
        }
      }
    });
  }

  /**
   * displays a modal for editing the product category
  */
  public editProductCategory = (): void => {
    Swal.fire({
      title: `Set a new category to ${this.currentEditableProduct.name}`,
      input: 'select',
      inputOptions: {
        'Pistols': 'Pistols',
        'Submachine Guns': 'Submachine Guns',
        'Assault Rifles': 'Assault Rifles',
        'Shotguns': 'Shotguns',
        'Sniper Rifles': 'Sniper Rifles',
      },
      showCancelButton: false,
      confirmButtonText: 'Update',
      preConfirm: (newProductCategory: string) => {
        if (newProductCategory.trim() !== "") {
          this.currentNewProductAfterChanges.category = newProductCategory;
          this.updateProduct();
        }
        else {
          PopupMessages.displayErrorPopupMessage("Category can't be empty");
        }
      }
    });
  }

  /**
 * displays a modal for editing the product ability
*/
  public editProductAbility = (): void => {
    Swal.fire({
      title: `Set a new ability to ${this.currentEditableProduct.name}`,
      input: 'select',
      inputOptions: {
        'Power': 'Power',
        'Smart': 'Smart',
        'Tech': 'Tech',
        'Blade': 'Blade',
        'Blunt': 'Blunt',
      },
      showCancelButton: false,
      confirmButtonText: 'Update',
      preConfirm: (newProductAbility: string) => {
        if (newProductAbility.trim() !== "") {
          this.currentNewProductAfterChanges.ability = newProductAbility;
          this.updateProduct();
        }
        else {
          PopupMessages.displayErrorPopupMessage("Ability can't be empty");
        }
      }
    });
  }


  /**
   * displays a modal for editing the product description
  */
  public editProductDescription = (): void => {
    Swal.fire({
      title: `Set a new description to ${this.currentEditableProduct.name}`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: (newProductDescription: string) => {
        if (newProductDescription.trim() !== "") {
          this.currentNewProductAfterChanges.description = newProductDescription;
          this.updateProduct();
        }
        else {
          PopupMessages.displayErrorPopupMessage("Description can't be empty");
        }
      }
    });
  }

  
  /**
   * displays a modal for editing the product damage
  */
   public editProductDamage = (): void => {
    Swal.fire({
      title: `Set a new Damage to ${this.currentEditableProduct.name}`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: (newProductDamage: string) => {
        if (+newProductDamage > 0) {
          const newDamage = +newProductDamage;
          this.currentNewProductAfterChanges.damage = +newDamage;
          this.updateProduct();
        }
        else {
          PopupMessages.displayErrorPopupMessage("Damage must be a number, and larger than 0");
        }
      }
    });
  }


  /**
   * displays a modal for editing the product price
  */
  public editProductPrice = (): void => {
    Swal.fire({
      title: `Set a new price to ${this.currentEditableProduct.name}`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: (newProductPrice: string) => {
        if (+newProductPrice > 0) {
          const newPrice = +newProductPrice;
          this.currentNewProductAfterChanges.price = +newPrice;
          this.updateProduct();
        }
        else {
          PopupMessages.displayErrorPopupMessage("Price must be a number, and larger than 0");
        }
      }
    });
  }

  /**
   * clears the form inputs
   */
  private clearFormInputs = (): void => {
    this.newNameInput.setValue(" ");
    this.newDescriptionInput.setValue(" ");
    this.newCategoryInput.setValue(" ");
    this.newAbilityInput.setValue(" ");
    this.newDamageInput.setValue(" ");
    this.newPriceInput.setValue(" ");
  }

}