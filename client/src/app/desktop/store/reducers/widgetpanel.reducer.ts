// import the interface
import { OpenPanel } from '../actions/widgetpanel.action';
import { createReducer, on } from '@ngrx/store';
import { WidgetPanel } from '../models/widgetpanel.model';
import { WIDGET_PANEL_INITIAL_STATE } from '../models/widgetpanel.constants';

//create a dummy initial state
const initialState: WidgetPanel =
{
	isActive: false,
	isLoginForm: false,
	isRegisterForm: false,
	lastAction: WIDGET_PANEL_INITIAL_STATE,
	lastActionDate: new Date()
};

export const WidgetPanelReducer = createReducer(
	initialState,
	on(OpenPanel, (state, action) => (
		{ 
			isActive: action.isActive,
			isLoginForm: action.isLoginForm,
			isRegisterForm: action.isRegisterForm,
			lastAction: action.lastAction,
			lastActionDate: action.lastActionDate			
		}))
)
