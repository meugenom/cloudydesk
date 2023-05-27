import {
	checkUserAction, checkUserFailureAction, checkUserSuccessAction,
	authenticateAction, authenticateFailureAction, authenticateSuccessAction,
	registerAction, registerFailureAction, registerSuccessAction,
	logoutAction, logoutFailureAction, logoutSuccessAction
} from '../actions/auth.action';
import { AuthStateInterface } from "../models/auth.state.model";
import { Action, createReducer, on } from '@ngrx/store';
import {User} from '../../user/model/user';

import { 
	AUTH_LOGIN_USER,
	AUTH_LOGIN_USER_FETCH_SUCCESSFUL,
	AUTH_LOGIN_USER_FETCH_ERROR,
	AUTH_CHECK_USER,
	AUTH_CHECK_USER_FETCH_SUCCESSFUL,
	AUTH_CHECK_USER_FETCH_ERROR,
	AUTH_REGISTER_USER,
	AUTH_REGISTER_USER_FETCH_SUCCESSFUL,
	AUTH_REGISTER_USER_FETCH_ERROR,
	AUTH_LOGOUT_USER,
	AUTH_LOGOUT_USER_FETCH_SUCCESSFUL,
	AUTH_LOGOUT_USER_FETCH_ERROR,
	NEW_INITIAL_STATE,
	LOADING
 } from '../models/auth.constants'


const initialState: AuthStateInterface = {
	isSubmitting: false,
	user: new User("","","","","", false),
	lastAction: LOADING,
	lastActionDate: new Date()
}

const authReducer = createReducer(
	initialState,
	on(authenticateAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false),
		lastAction: NEW_INITIAL_STATE,
		lastActionDate: new Date()

	})),
	on(authenticateSuccessAction, (state, { currentUser }) => ({
		...state,
		isSubmitting: true,
		user: currentUser,
		lastAction: AUTH_LOGIN_USER_FETCH_SUCCESSFUL,
		lastActionDate: new Date()

	})),
	on(authenticateFailureAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false),
		lastAction: AUTH_LOGIN_USER_FETCH_ERROR,
		lastActionDate: new Date()
	})),
	on(registerAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false),
		lastAction: AUTH_REGISTER_USER,
		lastActionDate: new Date()

	})),
	on(registerSuccessAction, (state, { currentUser }) => ({
		...state,
		isSubmitting: true,
		user: currentUser,
		lastAction: AUTH_REGISTER_USER_FETCH_SUCCESSFUL,
		lastActionDate: new Date()
	})),
	on(registerFailureAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false),
		lastAction: AUTH_REGISTER_USER_FETCH_ERROR,
		lastActionDate: new Date()

	})),
	on(checkUserAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false),
		lastAction: AUTH_CHECK_USER,
		lastActionDate: new Date()
	})),
	on(checkUserSuccessAction, (state, { currentUser }) => ({
		...state,
		isSubmitting: true,
		user: currentUser.user,
		lastAction: AUTH_CHECK_USER_FETCH_SUCCESSFUL,
		lastActionDate: new Date()
	})),
	on(checkUserFailureAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false),
		lastAction: AUTH_CHECK_USER_FETCH_ERROR,
		lastActionDate: new Date()

	})),
	on(logoutAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false),
		lastAction: AUTH_LOGOUT_USER,
		lastActionDate: new Date()

	})),
	on(logoutSuccessAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false),
		lastAction: AUTH_LOGOUT_USER_FETCH_SUCCESSFUL,
		lastActionDate: new Date()
	})),
	on(logoutFailureAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false),
		lastAction: AUTH_LOGOUT_USER_FETCH_ERROR,
		lastActionDate: new Date()
	})),

);


export function reducer(
	state: AuthStateInterface, 
	action: Action) {
	return authReducer(state, action);
}