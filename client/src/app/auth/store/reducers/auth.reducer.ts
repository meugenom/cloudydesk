import {
	checkUserAction, checkUserFailureAction, checkUserSuccessAction,
	authenticateAction, authenticateFailureAction, authenticateSuccessAction,
	registerAction, registerFailureAction, registerSuccessAction,
	logoutAction, logoutFailureAction, logoutSuccessAction
} from '../actions/auth.action';
import { AuthStateInterface } from "../models/auth.state.model";
import { Action, createReducer, on } from '@ngrx/store';
import {User} from '../../user/model/user';


const initialState: AuthStateInterface = {
	isSubmitting: false,
	user: new User("","","","","", false)
}

const authReducer = createReducer(
	initialState,
	on(authenticateAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false)

	})),
	on(authenticateSuccessAction, (state, { currentUser }) => ({
		...state,
		isSubmitting: true,
		user: currentUser

	})),
	on(authenticateFailureAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false)
	})),
	on(registerAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false)
	})),
	on(registerSuccessAction, (state, { currentUser }) => ({
		...state,
		isSubmitting: true,
		user: currentUser
	})),
	on(registerFailureAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false)

	})),
	on(checkUserAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false)
	})),
	on(checkUserSuccessAction, (state, { currentUser }) => ({
		...state,
		isSubmitting: true,
		user: currentUser.user
	})),
	on(checkUserFailureAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false)

	})),
	on(logoutAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false)

	})),
	on(logoutSuccessAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false)
	})),
	on(logoutFailureAction, (state) => ({
		...state,
		isSubmitting: false,
		user: new User("","","","","", false)
	})),

);


export function reducer(state: AuthStateInterface, action: Action) {
	return authReducer(state, action);
}