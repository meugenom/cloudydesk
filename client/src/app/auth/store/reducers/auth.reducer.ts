import { getUserToken, loginAction, loginFailureAction, loginSuccessAction } from '../actions/auth.action';
import { AuthStateInterface } from "../models/auth.state.model";
import { Action, createReducer, on } from '@ngrx/store';

const initialState: AuthStateInterface = {
    authToken: null,
}

const authReducer = createReducer(
    initialState,
    on(loginAction, (state) => ({
        ...state,
        isSubmitting: true,
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
    on(getUserToken, (state, { token }) => ({
        ...state,
        token,
        isSubmitting: false
    })),

);



export function reducer(state: AuthStateInterface, action: Action) {
    return authReducer(state, action);
}