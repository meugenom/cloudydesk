import { createAction, props } from '@ngrx/store';

export const AddEnvironment = createAction('[Environment Component] AddEnvironment',
    props<{
        theme: string
    }>());