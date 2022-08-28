import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
	userName: String;
	email: String;
	password: String;


	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private store: Store,
	) { 
		this.password = "";
		this.userName = "";
		this.email = "";
	}

	ngOnInit() {
		//this.getSomething()
	}

	public registerUser(addForm: NgForm): void {

		//		console.log(userName);

		const request: any = {
			userName: addForm.value.userName,
			emal: addForm.value.email,
			password: addForm.value.password
		}
		
		this.store.dispatch(registerAction({ request }));

	}

	getSomething() {
		this.authService.getSomething().subscribe(data => {
			console.log(data);
		})
	}

}
