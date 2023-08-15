
import {
	loadFiles, loadFilesSuccess, loadFilesError, setFiles
} from '../actions/file.actions';
import { FileState } from "../models/file.state.model";
import { Action, createReducer, on } from '@ngrx/store';


const initialState: FileState = {
	files: []
};

export const fileReducer = createReducer(
	initialState,
	on(loadFilesSuccess, (state, action) => (
		{
			files: action.files,
			dirs: action.dirs


		}
	)),
	on(setFiles, (state, action) => (		
		{
			files: action.files,
			dirs: action.dirs
		}
	)),
	on(loadFilesError, (state) => (
		{
			files: []
		}
	))
);
