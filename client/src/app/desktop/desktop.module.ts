
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//store and reducers
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { NavigatorReducer } from './store/reducers/navigator.reducer';


@NgModule({
  imports: [
    CommonModule,
	StoreModule.forRoot({ navigator: NavigatorReducer } as ActionReducerMap<any, any>),
    //StoreModule.forFeature('navigator', NavigatorReducer, {}),
	FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class DesktopModule { }
