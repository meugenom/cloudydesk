// import the interface
import { OpenPanel } from '../actions/widgetpanel.action';
import { createReducer, on } from '@ngrx/store';
import { WidgetPanel } from '../models/widgetpanel.model';

//create a dummy initial state
const initialState: WidgetPanel =
{
	isActive: false,
	isLoginForm: false,
	isRegisterForm: false
};

export const WidgetPanelReducer = createReducer(
	initialState,
	on(OpenPanel, (state, action) => (
		{ 
			isActive: action.isActive,
			isLoginForm: action.isLoginForm,
			isRegisterForm: action.isRegisterForm
		}))
)
