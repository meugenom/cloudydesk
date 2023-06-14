import { AuthService } from '../../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { registerAction, logoutAction } from '../../store/actions/auth.action';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { request } from 'express';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

	userForm!: FormGroup;

	constructor(
		private store: Store,
		) {}

	ngOnInit() {
	}

	logoutOut() {
		console.log('Logout from the system')

		const request: any = {
			email: "",
			password: ""
		}

		this.store.dispatch(logoutAction(request));
	}

}
