import { PersistanceService } from '../../services/persistance.service';
import { AuthService } from '../../services/auth.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, of, tap } from 'rxjs';
import { loginAction, loginFailureAction, loginSuccessAction, registerAction, 
		registerSuccessAction, registerFailureAction, signOutAction, checkUserSuccessAction, checkUserAction, checkUserFailureAction } from '../actions/auth.action';
//import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {
	constructor(
		private authService: AuthService,
		private actions$: Actions,
		//private router: Router,
		private persistanceService: PersistanceService
	) { }

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginAction),
			map(({ request }) => request),
			exhaustMap((request) => this.authService.login(request).pipe(
				concatMap(currentUser => [
					loginSuccessAction({ currentUser }),
					//loginRedirect()
				]),
				catchError(error => of(loginFailureAction({ error })))
			)),
		)
	);

	register$ = createEffect(() =>
		this.actions$.pipe(
			ofType(registerAction),
			map(({ request }) => request),
			exhaustMap((request) => this.authService.register(request).pipe(
				concatMap(currentUser => [
					registerSuccessAction({ currentUser }),
					//loginRedirect()
				]),
				catchError(error => of(registerFailureAction({ error })))
			)),
		)
	);

	checkUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(checkUserAction),
			map(({ request }) => request),
			exhaustMap((request) => this.authService.checkUser(request).pipe(
				concatMap(currentUser => [
					checkUserSuccessAction({ currentUser }),
					//loginRedirect()
				]),
				catchError(error => of(checkUserFailureAction({ error })))
			)),
		)
	);

	/*
	loginRedirect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginRedirect),
			tap(() => 
				//this.router.navigate(['/afterLogin'])
				console.log("success")
			)
		),
		{ dispatch: false }
	);
	*/

	loginSuccessAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginSuccessAction),
			tap((data) => {

				//console.log(data);
				this.persistanceService.setToken('auth', data.currentUser.token)
				this.persistanceService.setToken('name', data.currentUser.userName)
			})
		),
		{ dispatch: false }
	);

	registerSuccessAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(registerSuccessAction),
			tap((data) => {
				//console.log(data);
				this.persistanceService.setToken('auth', data.currentUser.token)
				this.persistanceService.setToken('name', data.currentUser.userName)
			})
		),
		{ dispatch: false }
	);

	checkUserSuccessAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(checkUserSuccessAction),
			tap((data) => {

				//console.log(data);
				//this.persistanceService.setToken('auth', data.currentUser.token)
				this.persistanceService.setToken('name', data.currentUser.userName)
			})
		),
		{ dispatch: false }
	);
	
	checkUserFailureAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(checkUserFailureAction),
			tap((data) => {

				//console.log(data);
				this.persistanceService.removeToken('auth')
				this.persistanceService.removeToken('name')
			})
		),
		{ dispatch: false }
	);
	
	signOutAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(signOutAction),
			tap(() => {
				this.persistanceService.removeToken('auth')
				this.persistanceService.removeToken('name')
			})
		),
		{ dispatch: false }
	);
}