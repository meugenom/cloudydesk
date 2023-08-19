import { createAction, props } from '@ngrx/store';

export const AddContext = createAction('[Context Component] AddContext',
	props<{
		folderSpaceId: string,
        itemId: string
		isItemDirectory: boolean
	}>());