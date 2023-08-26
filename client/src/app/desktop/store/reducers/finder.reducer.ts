// import the interface
import { Finder } from '../models/finder.model';
import { AddFinder } from '../actions/finder.action';
import { createReducer, on } from '@ngrx/store';

//create a dummy initial state
const initialState: Finder =
{
    currentDir: '',
    currentDirId: '',
    breadcrumbs: [],
    items: 0,
    selectedItems: 0
};

export const FinderReducer = createReducer(
    initialState,
    on(AddFinder, (state, action) => (
        {
            currentDir: action.currentDir,
            currentDirId: action.currentDirId,
            breadcrumbs: action.breadcrumbs,
            items: action.items,
            selectedItems: action.selectedItems
        }
    ))
);
