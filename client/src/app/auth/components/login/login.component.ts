import { loginAction } from '../../store/actions/auth.action';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-login',
	styleUrls: ['./login.component.sass'],
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	userForm!: FormGroup;
	email: String;
	password: String;


	constructor(
		private fb: FormBuilder,
		private store: Store,
		private cookieService: CookieService
	) {
		this.email = "";
		this.password = "";
	}

	ngOnInit(): void {

	}

	public loginUser(addForm: NgForm): void {

		const request: any = {
			email: addForm.value.email,
			password: addForm.value.password
		}

		this.store.dispatch(loginAction({ request }));
	}

}