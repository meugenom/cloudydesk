// import the interface
import { Finder } from '../models/finder.model';
import { AddFinder } from '../actions/finder.action';
import { createReducer, on } from '@ngrx/store';

//create a dummy initial state
const initialState: Finder =
{
    currentDir: '',
    currentDirId: ''
};

export const FinderReducer = createReducer(
    initialState,
    on(AddFinder, (state, action) => (
        {
            currentDir: action.currentDir,
            currentDirId: action.currentDirId
        }
    ))
);
