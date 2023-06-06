import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, concatMap, tap, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/notification/notification.service';
import { FileService } from '../../../file-list/services/file.service';
import { loadFiles, loadFilesSuccess, loadFilesError } from '../actions/file.actions';


@Injectable()
export class FileEffects {

	loadFiles$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadFiles),
			switchMap(() => this.fileService.ls({}).pipe(
				map((response: any) => loadFilesSuccess({ files: response.files, dirs: response.dirs})),
				catchError(() => of(loadFilesError()))
			))
		)
	);

	loadFilesError$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadFilesError),
			tap((data) => {

				//notify id something is wrong
				//setTimeout(() => {
				//	this.ntfService.error('Invalid User Name');
				//}, 1000);

			})

		),
		{ dispatch: false }
	);


	constructor(
		private actions$: Actions,
		private fileService: FileService,
		private ntfService: NotificationService
	) { }
}