import { createAction, props } from '@ngrx/store';

export const AddContext = createAction('[Context Component] AddContext',
	props<{
		usedFolder: string,
        usedFile: string
	}>());