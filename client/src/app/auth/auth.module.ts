//import { PersistanceService } from './services/persistance.service';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducer } from './store/reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './store/effects/auth.effect';
import { loginModule } from './components/login/login.module';
import { registerModule } from './components/register/register.module';
import { signoutModule } from './components/signout/signout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducer, {}),
    EffectsModule.forFeature([AuthEffect]),
	FormsModule,
    ReactiveFormsModule,
	loginModule,
	registerModule,
	signoutModule
  ],
  declarations: [
  ],
  providers: [
    AuthService,
//    PersistanceService
  ]
})
export class AuthModule { }
