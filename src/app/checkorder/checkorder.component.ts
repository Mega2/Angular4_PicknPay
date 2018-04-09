import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkorder',
  templateUrl: './checkorder.component.html',
  styleUrls: ['./checkorder.component.css']
})
export class CheckroderComponent implements OnInit {

    showSelected: boolean;
    OrdersArray=[];
    UserOrder=[];
    orders:Orders
    rForm: FormGroup;
    post:any;
    userOrders:UserOrders

         //Get loged in User
         get userLogedIn(): any {
          return localStorage.getItem('user');}


  constructor(private httpService: HttpClient, private http: Http, private router: Router, private fb: FormBuilder) {

    this.rForm = fb.group({
      'order':[null, Validators.required],
      'validate' : ''
    });
    this.showSelected = false;
   }

   onLogOut(){
    alert("Thank you for shopping with us. See you soon!!")
    localStorage.removeItem('user');
    console.log("good bye")
    this.router.navigate(['/login']);
  }

   addPost(post) {
    let orderID = post.order;

       //getting only outdoor from products
       this.httpService.get<UserOrders>("/CheckedOrder" +"/" + orderID).subscribe(orderData => {
        this.userOrders = orderData;
        });

    this.showSelected = true;
    console.log(orderID);


  }

    ngOnInit() {

      this.httpService.get<Array<Orders>>("/UserOrders" +"/" + localStorage.getItem('user')).subscribe(ordersData => {
        this.OrdersArray = ordersData;
        console.log("OrdersArray", this.OrdersArray)


      });

    }

  }

  interface Orders {
    orders: Orders[]
    }


  interface Orders {
    order_id
    user_name
    payment_id
    order_status

  }

  //Get all Cheched out orders
  interface UserOrder {
    cart_id
   user_name
  cart_quantity
  cart_price
  product_img
  product_name
  product_id
  order_id
  }

  interface UserOrders {
    userOrders: UserOrder[]
    }
