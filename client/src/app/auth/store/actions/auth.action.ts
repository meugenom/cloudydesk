import {
    createAction,
    props
} from '@ngrx/store';

import {User} from '../../user/model/user'
import { AUTH_LOGIN_USER,
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
		 AUTH_LOGOUT_USER_FETCH_ERROR
} from '../models/auth.constants'

export const authenticateAction = createAction( AUTH_LOGIN_USER, 
												props<{ user: User }>()
											  );
export const authenticateSuccessAction = createAction( AUTH_LOGIN_USER_FETCH_SUCCESSFUL , props<{currentUser: any}>());
export const authenticateFailureAction = createAction(AUTH_LOGIN_USER_FETCH_ERROR, props<{error: any}>());

export const registerAction = createAction(AUTH_REGISTER_USER, props<{ user: User }>());
export const registerSuccessAction = createAction(AUTH_REGISTER_USER_FETCH_SUCCESSFUL, props<{currentUser: any}>());
export const registerFailureAction = createAction(AUTH_REGISTER_USER_FETCH_ERROR, props<{error: any}>());

export const checkUserAction = createAction(AUTH_CHECK_USER);
export const checkUserSuccessAction = createAction(AUTH_CHECK_USER_FETCH_SUCCESSFUL, props<{currentUser: any}>());
export const checkUserFailureAction = createAction(AUTH_CHECK_USER_FETCH_ERROR, props<{error: any}>());

export const logoutAction = createAction(AUTH_LOGOUT_USER, props<{ request: any }>());
export const logoutSuccessAction = createAction(AUTH_LOGOUT_USER_FETCH_SUCCESSFUL, props<{currentUser: any}>());
export const logoutFailureAction = createAction(AUTH_LOGOUT_USER_FETCH_ERROR, props<{error: any}>());
