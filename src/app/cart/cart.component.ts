import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  title = 'app';
  allCarts:AllCarts
  total: number;

  cart = [];



    //Get loged in User
    get userLogedIn(): any {
      return localStorage.getItem('username');
  }

  get GetTotal(): any {
    return localStorage.getItem(localStorage.getItem('username'));
}

checkTotal()
{
  if(this.total == 0)
  {
    alert("Oooh noooo!!! Your cart is Empty please add items to see them.")
    location.reload();
  }
    else
      {
        this.router.navigate(['/checkout']);

      }
}

deleteCart(cart: Cart)
{ let cartId = cart.cart_id;
  const req = this.httpService.delete('/DeleteCart'+'/'+ cartId)
  .subscribe(req =>
    {
      console.log("Success");
      alert("Success")
      location.reload();
    },
    err =>
     {
      console.log("ERROR")
     }
  );
}

Decrmnt(cart: Cart)
{
let cqnty=cart.cart_quantity;
if(cqnty >1){
console.log(cart.cart_id)
let CartID = cart.cart_id;
let qnty = cart.cart_quantity - 1;
let UpdateCart = {
"cart_id" : cart.cart_id,
"user_name" : localStorage.getItem('username'),
"cart_price" : cart.cart_price,
"cart_quantity" : qnty,
"product_name" : cart.product_name,
 "product_id" : cart.product_id,
"product_img" : cart.product_img,};

console.log(UpdateCart)

  const res = this.http.put('/UpdateCart'+ '/' + '' + CartID,UpdateCart

  )
      .subscribe(
        res => {
          console.log(res);
          alert("Cart updated successfull");
          location.reload();
        },
        err => {
          console.log("Error occured");
          alert("Cart update unsuccessfull");
        }
      );
  }
}

Inccrmnt(cart: Cart)
{
  console.log(cart.cart_id)
let CartID = cart.cart_id;
let qnty = cart.cart_quantity + 1;
let UpdateCart = {
"cart_id" : cart.cart_id,
"user_name" : localStorage.getItem('username'),
"cart_price" : cart.cart_price,
"cart_quantity" : qnty,
"product_name" : cart.product_name,
 "product_id" : cart.product_id,
"product_img" : cart.product_img,};

console.log(UpdateCart)

  const res = this.http.put('/UpdateCart'+ '/' + '' + CartID,UpdateCart

  )
      .subscribe(
        res => {
          console.log(res);
          alert("Cart updated successfull");
          location.reload();
        },
        err => {
          console.log("Error occured");
          alert("Cart update unsuccessfull");
        }
      );

  }


  constructor(private httpService: HttpClient, private http: Http,private router: Router) { }

  ngOnInit(): void  {
    const userLogedIn = localStorage.getItem('username');
    this.httpService.get<Array<CartItems>>("/GetCarts" +"/" + userLogedIn).subscribe(cartData => {
         this.cart = cartData;


      var cartTotal = 0;
      for ( var i = 0; i < cartData.length; i++ ){
        cartTotal += cartData[i].cart_price * cartData[i].cart_quantity
      }
      localStorage.setItem( 'userCartTotal', JSON.stringify(cartTotal) )

      this.total = cartTotal;
      console.log ( this.total )


    });

  }

}

interface AllCarts {
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
