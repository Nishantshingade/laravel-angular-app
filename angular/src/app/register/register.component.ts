import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
		name: string ="";
  		email: string ="";
  		password: string ="";

	constructor(private auth: AuthenticationService, private router: Router) {

  	}

  	registerUser(){
  		this.auth.registerUser(this.name,this.email,this.password).subscribe(
	    data =>{
	    	alert('User is created successfully');
	    	this.router.navigate(['/todo']);
	      },
	      error => {
	        alert(error.error.message)
	      });
  	}

}
