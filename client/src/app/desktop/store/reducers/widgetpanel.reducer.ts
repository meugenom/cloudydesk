// import the interface
import { OpenPanel } from '../actions/widgetPanel.action';
import { createReducer, on } from '@ngrx/store';
import { WidgetPanel } from '../models/widgetPanel.model';

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
