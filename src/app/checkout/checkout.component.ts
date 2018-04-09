import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  Payment=[];
  payments:Payments

  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  CvC:string = '';
  Card_no:string = '';
  name:string = '';
  surname:string = '';
  banks: Array<any> =
  [
    { name: 'Absa bank', value: 'Absa', disabled: false },
    { name: 'First National Bank', value: 'FNB', disabled: false },
    { name: 'Nedbank bank', value: 'Nedbank', disabled: false },
    { name: 'Capitec bank', value: 'Capitec', disabled: false },
    { name: 'Standard bank', value: 'Standard', disabled: false },
 ];
 cardTypes: Array<any> =
   [
     { name: 'Credit card', value: 'Credit', disabled: false },
     { name: 'Debit card', value: 'Debit', disabled: false },
     { name: 'Maestro card', value: 'Maestro', disabled: false },
     { name: 'Master card', value: 'Master', disabled: false },
     { name: 'Visa card', value: 'Visa', disabled: false },
  ];
  titleAlert:string = 'This field is required';


 // payment: Payment = new Payment();

  //Get cart total
  get total(): any {
    return localStorage.getItem('userCartTotal');}

     //Get loged in User
  get userLogedIn(): any {
    return localStorage.getItem('user');}


  constructor(private httpService: HttpClient, private http: Http, private router: Router, private fb: FormBuilder) {

    this.rForm = fb.group({
      'name' : [null, Validators.required],
      'surname' : [null, Validators.required],
      'CvC' : [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[0-9]+') ])],
      'Card_no' : [null, Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('[0-9]+')])],
      'bank':[null, Validators.required],
      'cardType':[null, Validators.required],
      'validate' : ''
    });
  }

  addPost(post) {
    this.CvC = post.CvC;
    this.name = post.name;
    this.surname = post.surname;
    this.Card_no = post.Card_no;
    this.banks = post.bank;
    this.cardTypes = post.cardType;
    let UserTotal = localStorage.getItem('userCartTotal');
    console.log(this.name);
    console.log(this.surname);
    console.log(this.Card_no);
    console.log(this.CvC);
    console.log(this.banks);
    console.log(this.cardTypes);
    console.log(UserTotal);

    //Post User payment
    const res = this.http.post('/SavePayment',
    {user_name:localStorage.getItem('user'),
     first_name: this.name,
     last_name: this.surname,
     bank_type: this.banks,
     card_type: this.cardTypes,
     cvc_number: this.CvC,
     total: localStorage.getItem('userCartTotal'),
     card_number: this.Card_no,

    }
  )
    .subscribe(
      res => {
        console.log(res);
        alert("Your payment was successfull");
        //getting only fresh food from products
      this.httpService.get<Array<Payment>>("/UserPayment" +"/" + localStorage.getItem('user')).subscribe(payments => {
     this.Payment = payments;

      let payLength = payments.length;
      console.log(payLength)
      let payId = payments[payments.length -1].payment_id;
      console.log(payId)
      const res = this.http.post('/SaveOrders',
      {user_name:localStorage.getItem('user'),
       payment_id: payId,
       order_status: "pending",

      }
    )
      .subscribe(
        res => {
          //console.log(res);

        },
        err => {
          console.log("Error occured");
          alert("Order not successfull");
        }
      );
    });

        this.router.navigate(['/delivery']);
      },
      err => {
        console.log("Error occured");
        alert("Your payment was NOT successfull");
        location.reload();
      }
    );


  }

  ngOnInit() {


  }

}
interface Payments {
  payments: Payment[]
  }

interface Payment {
  payment_id
    total
    user_name
    first_name
    last_name
    bank_type
    card_type
    cvc_number
    card_number
}
