import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { registerAction } from '../../store/actions/auth.action';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {


	userForm!: FormGroup;
	firstName: String;
	lastName: String;
	email: String;
	password: String;
	roles: String;


	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private store: Store
	) { 
		this.firstName = "";
		this.lastName = "";
		this.email = "";
		this.password = "";
		this.roles = "";
	}

	ngOnInit() {
		//this.getSomething()
	}

	public registerUser(addForm: NgForm): void {

		//		console.log(userName);

		const request: any = {
			firstName: addForm.value.firstName,
			lastName: addForm.value.lastName,
			email: addForm.value.email,
			password: addForm.value.password,
			roles: "ROLE_USER"
		}
		
		this.store.dispatch(registerAction({ request }));

	}
	/*
	getSomething() {
		this.authService.getSomething().subscribe(data => {
			console.log(data);
		})
	}
	*/

}
