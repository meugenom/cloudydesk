import {
	createAction,
	props
} from '@ngrx/store';

import { File } from '../models/file.model'
import { Dir } from '../models/dir.model'

export const loadFiles = createAction('[File List] Load Files');
export const loadFilesSuccess = createAction('[File List] Load Files Success', props<{files: File[], dirs: Dir}>());
export const loadFilesError = createAction('[File List] Load Files Error');

//add new action to save file from client manipulation
export const setFiles = createAction('[File List] Set Files', props<{files: File[], dirs: Dir}>());
