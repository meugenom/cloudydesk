
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//store and reducers
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/index';

import { EffectsModule } from '@ngrx/effects';
import { FileEffects } from './store/effects/file.effects';



@NgModule({
  imports: [
    CommonModule,
	StoreModule.forRoot(reducers),
	FormsModule,
    ReactiveFormsModule,
	EffectsModule.forFeature([FileEffects])
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class DesktopModule { }
