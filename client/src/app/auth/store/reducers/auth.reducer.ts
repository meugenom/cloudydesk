import {
	checkUserAction, checkUserFailureAction, checkUserSuccessAction,
	loginAction, loginFailureAction, loginSuccessAction,
	registerAction, registerFailureAction, registerSuccessAction,
	signOutAction,
	signOutFailureAction,
	signOutSuccessAction
} from '../actions/auth.action';
import { AuthStateInterface } from "../models/auth.state.model";
import { Action, createReducer, on } from '@ngrx/store';

const initialState: AuthStateInterface = {
	authToken: null,
	isSubmitting: false,
	email: null
}

const authReducer = createReducer(
	initialState,
	on(loginAction, (state) => ({
		...state,
		isSubmitting: false,
	})),
	on(loginSuccessAction, (state, { currentUser }) => ({
		...state,
		isSubmitting: true,
		authToken: currentUser.token,
		email: currentUser.email
	})),
	on(loginFailureAction, (state) => ({
		...state,
		isSubmitting: false
	})),
	on(registerAction, (state) => ({
		...state,
		isSubmitting: false,
	})),
	on(registerSuccessAction, (state, { currentUser }) => ({
		...state,
		isSubmitting: true,
		authToken: currentUser.token,
		email: currentUser.email
	})),
	on(registerFailureAction, (state) => ({
		...state,
		isSubmitting: false
	})),
	on(checkUserAction, (state) => ({
		...state,
		isSubmitting: false,
	})),
	on(checkUserSuccessAction, (state, { currentUser }) => ({
		...state,
		isSubmitting: true,
		email: currentUser.email
	})),
	on(checkUserFailureAction, (state) => ({
		...state,
		isSubmitting: false,
		authToken: null,
		email: null
	})),
	on(signOutAction, (state) => ({
		...state,
		authToken: null,
		email: null,
		isSubmitting: false
	})),
	on(signOutSuccessAction, (state) => ({
		...state,
		authToken: null,
		email: null,
		isSubmitting: false
	})),
	on(signOutFailureAction, (state) => ({
		...state,
		authToken: null,
		email: null,
		isSubmitting: false
	})),

);



export function reducer(state: AuthStateInterface, action: Action) {
	return authReducer(state, action);
}