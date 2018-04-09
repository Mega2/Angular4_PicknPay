import { Component} from '@angular/core';
import { Router } from '@angular/router';


import { User } from '../user/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  user: User = new User();

  constructor( private router: Router, private userService: UserService)  { }

  createUser(): void {
    this.userService.createUser(this.user)
        .subscribe( data => {
          alert("User created successfully.");
          this.router.navigate(['/login']);
        });

  };
}
