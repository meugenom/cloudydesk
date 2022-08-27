import { loginAction } from '../../store/actions/auth.action';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-login',
	styleUrls: ['./login.component.sass'],
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	userForm!: FormGroup;
	userName: String;
	password: String;
	isSubmitting$: Observable<boolean> | undefined


	constructor(
		private fb: FormBuilder,
		private store: Store,
	) {
		this.password = "tester";
		this.userName = "tester";
	}

	ngOnInit(): void {

	}

	public onAddUser(addForm: NgForm): void {

		const userName = document.getElementById("username")?.nodeValue

		console.log(userName);

		const request: any = {
			userName: addForm.value.userName,
			password: addForm.value.password
		}

		this.store.dispatch(loginAction({ request }));

	}

}