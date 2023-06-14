import { AuthService } from '../../../services/auth.service';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { registerAction } from '../../store/actions/auth.action';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import {User} from '../../../user/models/user'

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

		const user = new User(
			addForm.value.firstName,
			addForm.value.lastName,
			addForm.value.email,
			addForm.value.password,
			"ROLE_USER",
			true);
		
		this.store.dispatch(registerAction({ user }));

	}

	/*
	getSomething() {
		this.authService.getSomething().subscribe(data => {
			console.log(data);
		})
	}
	*/

}
