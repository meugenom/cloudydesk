import {
	createAction,
	props
} from '@ngrx/store';

import { File } from '../models/file.model'

export const loadFiles = createAction('[File List] Load Files');
export const loadFilesSuccess = createAction('[File List] Load Files Success', props<{files: File[]}>());
export const loadFilesError = createAction('[File List] Load Files Error');
