import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
	
	todoList : any[] = [];
	users : any[] = [];
	todoData  : any[] = [];
  	isResultLoaded = false;
  	isUpdateFormActive = false;
  	title: string ="";
  	msg: string ="";
  	id = "";
  	btnName = "Create";
  	user :any;
  	shareWith :any = [];
  	sharedWithUserTodoList :any = [];
  	constructor(private auth: AuthenticationService, private router: Router) {
  		this.getToDoList();
  	}

  	ngOnInit(): void {
  		this.auth.status().subscribe((res:any) =>{
  			if(!res){
  				this.router.navigate(['/']);
  			}
  		});
  		const userDetails:any = localStorage.getItem('user');
  		const user = JSON.parse(userDetails);
  		const token = user.token;
  		const headers = new HttpHeaders({
  			Authorization: `Bearer ${token}`,
  		});
  		this.auth.user(headers).subscribe(
	    data =>{
	    this.user = data;
	      },
	      error => {
	     });

  	}

  	displayStyle = "none"; 
  
  openPopup(todo: any) {
  	this.todoData = todo;
    this.displayStyle = "block"; 
    this.userList();
  } 
  closePopup() { 
    this.displayStyle = "none"; 
  }

  share(todoData: any){
  let data = {
	      "shareWith" : this.shareWith,
	      "todoData" : todoData
	    };
  this.auth.share(data).subscribe((res: any)=>{
	     if(res == 'shared'){
	     	alert('shared');
	     }   
	});
  }

  userList(){
  	const userDetails:any = localStorage.getItem('user');
  	const user = JSON.parse(userDetails);
  	this.auth.userList(user.id).subscribe((response: any)=>{
	        console.log(response);
	        this.users = response;
	    });
  }

  	getToDoList(){
  	const userDetails:any = localStorage.getItem('user');
  	const user = JSON.parse(userDetails);
  	console.log(user.id,666666666);
	  	this.btnName = "Create";
	  	this.auth.todoList(user.id)
	  	.subscribe((resultData: any)=>
	    {
	        this.isResultLoaded = true;
	        console.log(resultData);
	        this.todoList = resultData.userTodoList;
	        this.sharedWithUserTodoList = resultData.sharedWithUserTodoList;
	    });
  	}

  	
  	register(){
	    this.auth.register(this.title,this.msg,this.user.id).subscribe(
	    data =>{
	        alert("To do Item Created Successfully")
	        this.getToDoList();
	        this.title = '';
	        this.msg = '';
	      },
	      error => {
	      console.log(error,555);
	        alert(error.error.message)
	      });
  	}

  	save(){
	  	if(this.id == ''){
	  		this.register();
	  	}else{
	  		this.update();
	  	}
  	}

  	logout(){
  		localStorage.removeItem('user');
  		this.router.navigate(['/']);
  	}

  	setUpdate(data: any){
	  	this.title = data.title;
	  	this.msg = data.msg;
	  	this.id = data.id;
	  	this.btnName = "Update";
  	}

  	update(){
  		const id = this.id;
	    this.auth.update(this.title,this.msg,this.id).subscribe(
	    data =>{
	        alert("To Do Item Updated")
	        this.getToDoList();
	        this.title = '';
	        this.msg = '';
	        this.id = "";
	      },
	    error => {
	      alert(error.error.message)
	     });	
  	}

  	setStatus(data: any,status: any){
	   	this.auth.setStatus(data.id,status).subscribe(
	    data =>{
	    	(status == 2) ? alert("Item marked as Completed") : alert("Item is Deleted");
	        this.getToDoList();
	        this.title = '';
	        this.msg = '';
	        this.id = "";
	      },
	    error => {
	      alert(error.error.message)
	     });
  		
  	}

}
