import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  title = 'app';
  allProducts:AllProducts
  Beverages:AllProducts
  FreshFood:AllProducts
  FoodCupboard:AllProducts
  FrozenFood:AllProducts
  Meals:AllProducts
  Baby:AllProducts
  Health:AllProducts
  Electronics:AllProducts
  Outdoor:AllProducts
  Household:AllProducts
  allCarts: AllCarts;
  CartTotal: any = 0
  cart = [];

  //gets you the user thats logged in byhis username.
  get userLogedIn(): any {
    return localStorage.getItem('username');
}


  constructor(private httpService: HttpClient, private http: Http, private router: Router) {

  }

  onLogOut(){
    alert("Thank you for shopping with us. See you soon!!")
    localStorage.removeItem('user');
    console.log("good bye")
    this.router.navigate(['/login']);
  }


    onSelect(product:Product)

     {

      let productID =0;
      let CartPos =0;

      const userLogedIn = localStorage.getItem('username');
      this.httpService.get<Array<CartItems>>("/GetCarts" +"/" + userLogedIn).subscribe(cartData => {
           this.cart = cartData;


           for ( var i = 0; i < cartData.length; i++ ){
             if(cartData[i].product_id == product.product_id)
             {
              productID = product.product_id;
              CartPos = i;

             }


        }

        if(product.product_id == productID)
        {

         let CartID = cartData[CartPos].cart_id;
         let qnty = cartData[CartPos].cart_quantity + 1;

         let UpdateCart = {
         "cart_id" : cartData[CartPos].cart_id,
         "user_name" : localStorage.getItem('username'),
         "cart_price" : cartData[CartPos].cart_price,
         "cart_quantity" : qnty,
         "product_name" : cartData[CartPos].product_name,
         "product_id" : cartData[CartPos].product_id,
         "product_img" :cartData[CartPos].product_img,};


         const res = this.http.put('/UpdateCart'+ '/' + '' + CartID,UpdateCart

        )
            .subscribe(
              res => {
                console.log(res);
                location.reload();
              },
              err => {
                console.log("Error occured");
                alert("Cart update unsuccessfull");
                location.reload();
              }
            );
       } else{
        const res = this.http.post('/SaveCart',
        {user_name:localStorage.getItem('username'),
         product_id: product.product_id,
         product_name: product.product_name,
         product_img: product.product_img,
         cart_quantity: 1,
         cart_price: product.product_price,

        }
      )
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log("Error occured");
            alert("product NOT Added to cart");
          }
        );
       }


     });

  }


   ngOnInit(): void {
   this.httpService.get<AllProducts>("/GetProducts").subscribe(products => {
   this.allProducts = products;
   });

   //getting only fresh food from products
   this.httpService.get<AllProducts>("/ProductCategory" +"/" + 1).subscribe(products => {
    this.FreshFood = products;
    console.log(this.FreshFood)
     });

     //getting only food cupboard from products
   this.httpService.get<AllProducts>("/ProductCategory" +"/" + 3).subscribe(products => {
    this.FoodCupboard = products;
     });

        //getting only frozen food from products
   this.httpService.get<AllProducts>("/ProductCategory" +"/" + 2).subscribe(products => {
     this.FrozenFood = products;
     });

          //getting only meals from products
   this.httpService.get<AllProducts>("/ProductCategory" +"/" + 5).subscribe(products => {
     this.Meals = products;
     });

   //getting only beverages from products
   this.httpService.get<AllProducts>("/ProductCategory" +"/" + 4).subscribe(products => {
  this.Beverages = products;
   });

   //getting only baby from products
   this.httpService.get<AllProducts>("/ProductCategory" +"/" + 6).subscribe(products => {
    this.Baby = products;
     });

     //getting only beverages from products
   this.httpService.get<AllProducts>("/ProductCategory" +"/" + 7).subscribe(products => {
   this.Health = products;
     });

     //getting only electronics from products
   this.httpService.get<AllProducts>("/ProductCategory" +"/" + 8).subscribe(products => {
    this.Electronics = products;
     });

      //getting only outdoor from products
   this.httpService.get<AllProducts>("/ProductCategory" +"/" + 9).subscribe(products => {
    this.Outdoor = products;
     });

        //getting only outdoor from products
   this.httpService.get<AllProducts>("/ProductCategory" +"/" + 10).subscribe(products => {
     this.Household = products;
     });




   this.httpService.get<AllCarts>("/GetCarts").subscribe(carts => {
    this.allCarts = carts;
     });
   }
  }
  const userEmail =  localStorage.getItem('username');
  console.log( userEmail);

    //gets you all products.
    interface Product {
      product_id:number;
      product_name:String;
      category_id:number;
      product_price:number;
      product_img:String;
    }

     interface AllProducts {
      allProducts:Product[]
      }

      //Get all carts
      interface Cart
      {
        cart_id: number;
        user_name:String;
        cart_quantity: number;
        cart_price:number;
        product_img:String;
        product_name:String;
        product_id: number;
      }
        interface AllCarts
      {
        allCarts: Cart[]
      }

      interface CartItems{
        cart_id
        product_id
        product_name
        product_img
        cart_quantity
        cart_price
        user_name
      }

