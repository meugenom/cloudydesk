//import { PersistanceService } from '../../services/persistance.service';
import { AuthService } from '../../services/auth.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, of, tap } from 'rxjs';
import { 	authenticateAction,
			authenticateFailureAction,
			authenticateSuccessAction,
			registerAction,
			registerSuccessAction,
			registerFailureAction,
			checkUserSuccessAction,
			checkUserAction,
			checkUserFailureAction,
			logoutAction,
			logoutSuccessAction,
			logoutFailureAction } from '../actions/auth.action';
import { NotificationService } from 'src/app/notification/notification.service';
//import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {
	constructor(
		private authService: AuthService,
		private actions$: Actions,
		//private router: Router,
		//private persistanceService: PersistanceService,
		private ntfService: NotificationService
	) { }

	authenticate$ = createEffect(() =>
		this.actions$.pipe(
			ofType(authenticateAction),
			map(({ user }) => user),
			exhaustMap((user) => this.authService.authenticate(user).pipe(
				concatMap(currentUser => [
					authenticateSuccessAction({ currentUser }),
					//loginRedirect()
				]),
				catchError(error => of(authenticateFailureAction({ error })))
			)),
		)
	);

	register$ = createEffect(() =>
		this.actions$.pipe(
			ofType(registerAction),
			map(({ user }) => user),
			exhaustMap((user ) => this.authService.register(user).pipe(
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
			exhaustMap(() => this.authService.checkUser().pipe(
				concatMap(currentUser => [
					checkUserSuccessAction({ currentUser }),
					//loginRedirect()
				]),
				catchError(error => of(checkUserFailureAction({ error })))
			)),
		)
	);

	authenticateSuccessAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(authenticateSuccessAction),
			tap((data) => {

				//console.log(data);
				//this.persistanceService.setToken('auth', data.currentUser.token)
				//this.persistanceService.setToken('email', data.currentUser.email)

				//notify Logged-In
				setTimeout(() => {
					this.ntfService.success('Logged-In');
				}, 300);
			})
		),
		{ dispatch: false }
	);

	registerSuccessAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(registerSuccessAction),
			tap((data) => {
				//console.log(data);
				//this.persistanceService.setToken('auth', data.currentUser.token)
				//this.persistanceService.setToken('email', data.currentUser.email)

				//notify Signed-In 
				setTimeout(() => {
					this.ntfService.success('Registered');
				}, 300);
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
				//this.persistanceService.setToken('email', data.currentUser.email)

				//notify checked 
				setTimeout(() => {
					this.ntfService.success('Logged-In');
				}, 300);
			})
		),
		{ dispatch: false }
	);
	
	checkUserFailureAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(checkUserFailureAction),
			tap((data) => {

				//console.log(data);
				//this.persistanceService.removeToken('auth')
				//this.persistanceService.removeToken('email')

				//notify id something is wrong
				setTimeout(() => {
					this.ntfService.error('User Unknown!');
				}, 300);
			})
		),
		{ dispatch: false }
	);

	authenticateFailureAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(authenticateFailureAction),
			tap((data) => {

				//notify id something is wrong
				setTimeout(() => {
					this.ntfService.error('Login Error');
				}, 300);

			})
			
		),
		{ dispatch: false }
	);
	
	/*
	signOutAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(signOutAction),
			tap(() => {
				this.persistanceService.removeToken('auth')
				this.persistanceService.removeToken('email')

				//notify sing-out
				setTimeout(() => {
					this.ntfService.success('Bye-Bye');
				}, 300);
			})
		),
		{ dispatch: false }
	);
	*/

	logoutAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(logoutAction),
			map(({ request }) => request),
			exhaustMap((request) => this.authService.logout(request).pipe(
				concatMap(currentUser => [
					logoutSuccessAction({ currentUser }),
				]),
				catchError(error => of(authenticateFailureAction({ error })))
			)),
		)
	);

	logoutSuccessAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(logoutSuccessAction),
			tap((data) => {

				//console.log(data);
				//this.persistanceService.removeToken('auth')
				//this.persistanceService.removeToken('email')

				//notify Logged-In
				setTimeout(() => {
					this.ntfService.success('User signed-out');
				}, 300);
			})
		),
		{ dispatch: false }
	);

	signOutFailureAction$ = createEffect(() =>
		this.actions$.pipe(
			ofType(logoutFailureAction),
			tap((data) => {

				//notify id something is wrong
				setTimeout(() => {
					this.ntfService.error('Sign-Out Error');
				}, 300);

				//notify warning to use tester:tester
				setTimeout(() => {
					this.ntfService.warning('User sign-out error');
				}, 600);

			})
			
		),
		{ dispatch: false }
	);
}