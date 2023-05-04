import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { registerAction, signOutAction } from '../../store/actions/auth.action';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { request } from 'express';

@Component({
	selector: 'app-signout',
	templateUrl: './signout.component.html',
	styleUrls: ['./signout.component.sass']
})
export class SignoutComponent implements OnInit {

	userForm!: FormGroup;

	constructor(
		private store: Store,
		) {}

	ngOnInit() {
	}

	signOut() {
		console.log('Sign Out')

		const request: any = {
			email: "",
			password: ""
		}

		this.store.dispatch(signOutAction(request));
	}

}
