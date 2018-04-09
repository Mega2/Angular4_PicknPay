import { User } from './../user/user.model';
import { Component} from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  user: User = new User();


  constructor( private router: Router, private userService: UserService) { }

  LoginUser(): void {
    this.userService.LoginUser(this.user)
        .subscribe( data => {
          let userName = this.user.username;
          localStorage.setItem('username', userName);
          alert("Login successfully.");
          this.router.navigate(['/UserDashboard']);
        });



  };
}
