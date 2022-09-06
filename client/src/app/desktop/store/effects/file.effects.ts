import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, concatMap, tap, switchMap } from 'rxjs/operators';
import { FileService } from '../../../file-list/services/file.service';
import { loadFiles, loadFilesSuccess, loadFilesError } from '../actions/file.actions';


@Injectable()
export class FileEffects {
	loadFiles$ = createEffect(() =>
	  this.actions$.pipe(
		ofType(loadFiles),
		switchMap(() => this.fileService.ls({}).pipe(
		  map((response : any) => loadFilesSuccess({files: response.files})),
		  catchError(() => of(loadFilesError()))
		))
	  )
	);
  
	constructor(
	  private actions$: Actions,
	  private fileService: FileService
	) {}
  }