import {
    createAction,
    props
} from '@ngrx/store';

import {User} from '../../user/model/user'

export const authenticateAction = createAction('[Auth] Authenticate', props<{ user: User }>());
export const authenticateSuccessAction = createAction('[Auth] Authenticate success', props<{currentUser: any}>());
export const authenticateFailureAction = createAction('[Auth] Authenticate error', props<{error: any}>());

export const registerAction = createAction('[Auth] Register', props<{ user: User }>());
export const registerSuccessAction = createAction('[Auth] Register success', props<{currentUser: any}>());
export const registerFailureAction = createAction('[Auth] Register error', props<{error: any}>());

export const checkUserAction = createAction('[Auth] Check User');
export const checkUserSuccessAction = createAction('[Auth] Check User success', props<{currentUser: any}>());
export const checkUserFailureAction = createAction('[Auth] Check User error', props<{error: any}>());

export const logoutAction = createAction('[Auth] SignOut', props<{ request: any }>());
export const logoutSuccessAction = createAction('[Auth] SignOut success', props<{currentUser: any}>());
export const logoutFailureAction = createAction('[Auth] SignOut error', props<{error: any}>());
