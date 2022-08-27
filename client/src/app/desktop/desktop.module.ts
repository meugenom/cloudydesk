
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//store and reducers
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/index';



@NgModule({
  imports: [
    CommonModule,
	StoreModule.forRoot(reducers),
	FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class DesktopModule { }
