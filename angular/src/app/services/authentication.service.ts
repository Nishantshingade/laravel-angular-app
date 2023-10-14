import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	
	private isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  toggleLogin(state:boolean):void{
  	this.isLoggedIn.next(state);
  }

  status(){
  	const localData:any = localStorage.getItem('user');
  	if(!localData){
  		this.isLoggedIn.next(false);
  		console.log('User Not Logged in');
  	}else{
  		const user = JSON.parse(localData);
  		const token_expire_at = new Date(user.token_expire_at);
  		const current_date = new Date();
  		if(token_expire_at > current_date){
  			this.isLoggedIn.next(true);
  		}else{
  			this.isLoggedIn.next(false);
  			console.log('Token Expred');
  		}
  	}		
  		return this.isLoggedIn.asObservable();
  }

  login(email:string, password:string){
    return this.http.post("http://127.0.0.1:8000/api/login",{
	      "email" : email,
	      "password" : password
	    });
  }

  registerUser(name:string,email:string, password:string){
  	return this.http.post("http://127.0.0.1:8000/api/register",{
  			"name" : name,
	      	"email" : email,
	      	"password" : password
	    });
  }

  user(headers :any){
  	return this.http.get("http://localhost:8000/api/user",{
  		headers: headers,
  	});
  }

  todoList(id:any){
  	return this.http.post('http://localhost:8000/api/todo/list',{id:id});
  }

  register(title:string,msg:string,created_by:any){
  	return this.http.post("http://localhost:8000/api/todo/save",{
	      "title" : title,
	      "msg" : msg,
	      "created_by" : created_by
	    });
  }

  update(title:string,msg:string,id:string){
  	return this.http.patch("http://localhost:8000/api/todo/update"+ "/"+ id,{
	      "title" : title,
	      "msg" : msg
	    });
  }

  setStatus(id:string,status:string){
  	return this.http.patch("http://localhost:8000/api/todo/update/status"+ "/"+ id,{
	      "id" : id,
	      "status" : status
	    });
  }

  userList(user:any){
  	return this.http.post('http://localhost:8000/api/todo/user/list',{user:user});
  }

  share(data:any){
	return this.http.post('http://localhost:8000/api/todo/user/share',{data:data});
  }

}
