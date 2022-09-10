import {
	checkUserAction, checkUserFailureAction, checkUserSuccessAction,
	loginAction, loginFailureAction, loginSuccessAction,
	registerAction, registerFailureAction, registerSuccessAction,
	signOutAction
} from '../actions/auth.action';
import { AuthStateInterface } from "../models/auth.state.model";
import { Action, createReducer, on } from '@ngrx/store';

const initialState: AuthStateInterface = {
	authToken: null,
	isSubmitting: false,
	name: null
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
		name: currentUser.userName
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
		name: currentUser.userName
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
		name: currentUser.userName
	})),
	on(checkUserFailureAction, (state) => ({
		...state,
		isSubmitting: false,
		authToken: null,
		name: null
	})),
	on(signOutAction, (state) => ({
		...state,
		authToken: null,
		isSubmitting: false
	})),

);



export function reducer(state: AuthStateInterface, action: Action) {
	return authReducer(state, action);
}