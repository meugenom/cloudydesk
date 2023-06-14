// import the interface
import { Environment } from '../models/environment.model';
import { AddEnvironment } from '../actions/environment.action';
import { createReducer, on } from '@ngrx/store';

//create a dummy initial state
const initialState: Environment =
    {
        theme: "space"

    };

export const EnvironmentReducer = createReducer(
    initialState,
    on(AddEnvironment, (state, action) => (

        {
            theme: action.theme
        }
    ))
)