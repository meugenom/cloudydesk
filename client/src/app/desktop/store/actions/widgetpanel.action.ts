import { createAction, props } from '@ngrx/store';

export const OpenPanel = createAction('[WidgetPanel Component] OpenPanel',
	props<{
		isActive: boolean,
		isLoginForm: boolean,
		isRegisterForm: boolean
	}>());