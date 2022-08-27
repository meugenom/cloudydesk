import { createAction, props } from '@ngrx/store';

export const AddDimensions = createAction('[Navigator Component] AddDimensions',
	props<{
		width: number,
		height: number,
		isMobile: boolean,
		browser: string
	}>());