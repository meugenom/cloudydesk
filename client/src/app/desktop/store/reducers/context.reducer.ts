// import the interface
import { Context } from '../models/context.model';
import { AddContext } from '../actions/context.action';
import { createReducer, on } from '@ngrx/store';

//create a dummy initial state
const initialState: Context =
{
    folderSpaceId: '',
    itemId: '',
    isItemDirectory: false

};

export const ContextReducer = createReducer(
    initialState,
    on(AddContext, (state, action) => (

        {

            folderSpaceId: action.folderSpaceId,
            itemId: action.itemId,
            isItemDirectory: action.isItemDirectory
        }
    ))
)
