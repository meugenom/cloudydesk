import { getUserToken, loginAction, loginFailureAction, loginSuccessAction,
	registerAction, registerFailureAction, registerSuccessAction } from '../actions/auth.action';
import { AuthStateInterface } from "../models/auth.state.model";
import { Action, createReducer, on } from '@ngrx/store';

const initialState: AuthStateInterface = {
    authToken: null,
	isSubmitting: false
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
        authToken: currentUser.token
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
        authToken: currentUser.token
    })),
    on(registerFailureAction, (state) => ({
        ...state,
        isSubmitting: false
    })),
    on(getUserToken, (state, { token }) => ({
        ...state,
        //token,
		authToken: token,
        isSubmitting: true
    })),

);



export function reducer(state: AuthStateInterface, action: Action) {
    return authReducer(state, action);
}