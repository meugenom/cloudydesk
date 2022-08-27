// import the interface
import { Navigator } from '../models/navigator.model';
import { AddDimensions } from '../actions/navigator.action';
import { createReducer, on } from '@ngrx/store';

//create a dummy initial state
const initialState: Navigator =
{
	width: 0,
	height: 0,
	isMobile: false,
	browser: 'default'
};

export const NavigatorReducer = createReducer(
	initialState,
	on(AddDimensions, (state, action) => (
		{ 
			width: action.width, 
			height: action.height, 
			isMobile: action.isMobile, 
			browser: action.browser
		}))
)
