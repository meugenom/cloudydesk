import { authenticateAction } from '../../store/actions/auth.action';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import {User} from '../../../user/models/user'

@Component({
	selector: 'app-authenticate',
	styleUrls: ['./authenticate.component.sass'],
	templateUrl: './authenticate.component.html'
})
export class AuthenticateComponent implements OnInit {

	userForm!: FormGroup;
	email: String;
	password: String;


	constructor(
		private fb: FormBuilder,
		private store: Store
	) {
		this.email = "";
		this.password = "";
	}

	ngOnInit(): void {

	}

	/**
	 * @description Authenticate user
	 * @param addForm 
	 * @returns void
	 */
	public authenticateUser(addForm: NgForm): void {

		const user = new User("", "", "", "", "", true);

		user.setEmail(addForm.value.email);
		user.setPassword(addForm.value.password);
		//console.log(user);

		// Dispatch action to the store
		this.store.dispatch(authenticateAction({ user }));
	}

}