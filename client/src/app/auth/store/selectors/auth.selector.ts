import { AuthStateInterface } from '../models/auth.state.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const authFeatureSelector = createFeatureSelector<AuthStateInterface>('auth');


// Select actions from the Auth state
export const selectAuth = createSelector(
	authFeatureSelector,
	(state: AuthStateInterface) => state
);

