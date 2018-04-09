import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  address:string = '';
  contact_no:string = '';
  user_locations: Array<any> =
  [
    { name: 'JHB CBD', value: 'JHB', disabled: false },
    { name: 'Santon', value: 'Santon', disabled: false },
    { name: 'Midrand', value: 'Midrand', disabled: false },
    { name: 'Soweto', value: 'Soweto', disabled: false },
    { name: 'Alexandria', value: 'Alexandria', disabled: false },
 ];
 titleAlert:string = 'This field is required';

  constructor(private httpService: HttpClient, private http: Http, private router: Router, private fb: FormBuilder) {

    this.rForm = fb.group({
      'address' : [null, Validators.required],
      'contact_no' : [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern('[0-9]+') ])],
     'user_location':[null, Validators.required],
      'validate' : ''
    });

   }


   addPost(post) {
    this.address = post.address;
    this.contact_no = post.contact_no;
    this.user_locations = post.user_location;
	//getting only user order from orders
      this.httpService.get<Array<Orders>>("/UserOrders" +"/" + localStorage.getItem('user')).subscribe(orders => {
    	  let orderLength = orders.length;
      let orderId = orders[orders.length -1].order_id;

    //Post User Delivery
    const res = this.http.post('/SaveDelivery',
    {user_name:localStorage.getItem('user'),
    location_address: this.address,
     contact_no: this.contact_no,
     user_location: this.user_locations,
     order_id: orderId,

    }
  )
  .subscribe(
    res => {
      console.log(res);
      //getting only user order from orders
      this.httpService.get<Array<Orders>>("/UserOrders" +"/" + localStorage.getItem('user')).subscribe(orders => {

      let orderLength = orders.length;
     let orderId = orders[orders.length -1].order_id;



      this.httpService.get<Array<CartItems>>("/viewCart" +"/" + localStorage.getItem('user')).subscribe(cartData => {
     for ( var i = 0; i < cartData.length; i++ ){
         //Adding to checked out carts
         const res = this.http.post('/SaveCheckedOrders',
       {user_name:localStorage.getItem('user'),
        product_id: cartData[i].product_id,
        product_name: cartData[i].product_name,
        product_img: cartData[i].product_img,
        cart_quantity: cartData[i].cart_quantity,
        cart_price: cartData[i].cart_price,
		    order_id: orderId,
      }
     )
       .subscribe(
         res => {
          console.log("Success");
         },
         err => {
           alert("Error");
         }
       );


          }

          for ( var i = 0; i < cartData.length; i++ ){
            const req = this.httpService.delete('/DeleteCart'+'/'+ cartData[i].cart_id)
            .subscribe(req =>{
                console.log("Success");
            },
            err =>{
              console.log("ERROR")
              alert("Delete unsuccessfull");
            }
          );

          }
          this.router.navigate(['/UserDashboard']);

      }
    );

    }
    );
    },
    err => {
      console.log("Error occured");
      alert("Delivery unsuccessfull");
      location.reload();
    }
  );

});

  }

  ngOnInit() {
  }

}

interface Orders {
  order_id
  user_name
  payment_id
  order_status
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
