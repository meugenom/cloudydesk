import { createAction, props } from '@ngrx/store';

export const AddFinder = createAction('[Finder Component] AddFinder',
	props<{
		currentDir: string,
		currentDirId: string,
		breadcrumbs: any[],
		items: number,
		selectedItems: number
	}>());