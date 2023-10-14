import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgForm} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	email: string ="nishant.shingade@gmail.com";
  	password: string ="nishant";
  	constructor(private auth: AuthenticationService, private router: Router) {
  	}

	ngOnInit(): void {
		localStorage.removeItem('user');
	}

	onSubmit(){
	    this.auth.login(this.email,this.password).subscribe(
	    data =>{
	    localStorage.setItem('user',JSON.stringify(data));
	        alert("Successffully Logged In");
	        this.router.navigate(['/todo'])
	      },
	      error => {
	        alert(error.error.message)
	      });
	}

	checkLogin(){
	  	this.onSubmit();
  	}


}
