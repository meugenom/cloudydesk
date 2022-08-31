import {
    createAction,
    props
} from '@ngrx/store';

export const loginAction = createAction('[Auth] Login', props<{ request: any }>());
export const loginSuccessAction = createAction('[Auth] Login success', props<{currentUser: any}>());
export const loginFailureAction = createAction('[Auth] Login error', props<{error: any}>());

export const registerAction = createAction('[Auth] Register', props<{ request: any }>());
export const registerSuccessAction = createAction('[Auth] Register success', props<{currentUser: any}>());
export const registerFailureAction = createAction('[Auth] Register error', props<{error: any}>());

export const checkUserAction = createAction('[Auth] Check User', props<{ request: any }>());
export const checkUserSuccessAction = createAction('[Auth] Check User success', props<{currentUser: any}>());
export const checkUserFailureAction = createAction('[Auth] Check User error', props<{error: any}>());


export const signOutAction = createAction('[Auth] SignOut');


export const getUserToken = createAction('[Auth] Get User Token', props<{ token: any }>());

//not usable
//export const loginRedirect = createAction('[Auth] Login Redirect');
