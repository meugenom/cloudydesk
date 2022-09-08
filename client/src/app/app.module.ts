import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopComponent } from './desktop/desktop.component';
import { FullscreenDirective } from './fullscreen/fullscreen.directive';
import { UploadingDirective } from './uploading/uploading.directive';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { FinderComponent } from './finder/finder.component';
import { DrawComponent } from './draw/draw.component';
import { TerminalComponent } from './terminal/terminal.component';
import { EditorComponent } from './editor/editor.component';
import { CameraComponent } from './camera/camera.component';
import { SettingsComponent } from './settings/settings.component';
import { FileListModule } from './file-list/file-list.module';

//global values
import { Globals } from './global';

//modals
import { ModComponent } from './mod/mod.component';
import { ModService } from './mod/mod.service';

//context menu
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuService } from './context-menu/context-menu.service';

//spinner
import { ProgressbarComponent } from './progressbar/progressbar.component';

//loading interceptor
import { LoadingInterceptor } from './loader/loading.interceptor';

//devtools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment

//auth
import { AuthModule } from './auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpConfigInterceptor } from './auth/interceptors/httpconfig.interceptor';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { SignedinComponent } from './auth/components/signedin/signedin.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DesktopModule } from './desktop/desktop.module';
import { WidgetPanelComponent } from './widget-panel/widget-panel.component';
import { ClockComponent } from './clock/clock.component';
import { UploadingComponent } from './uploading/uploading.component';
import { uploadingModule } from './uploading/uploading.module';



@NgModule({
	declarations: [
		AppComponent,
		DesktopComponent,
		FullscreenDirective,
		TaskbarComponent,
		FinderComponent,
		DrawComponent,
		TerminalComponent,
		EditorComponent,
		CameraComponent,
		SettingsComponent,
		ModComponent,
		ContextMenuComponent,
		ProgressbarComponent,
		LoginComponent,
		RegisterComponent,
		SignedinComponent,
		UploadingDirective,
  		WidgetPanelComponent,
    ClockComponent,
    UploadingComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		HttpClientModule,
		FileListModule,
		uploadingModule,
		//RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		AuthModule,
		DesktopModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.production, // Restrict extension to log-only mode
			autoPause: true, // Pauses recording actions and state changes when the extension window is not open
		}),
		EffectsModule.forRoot([]),
	],
	providers: [ModService, Globals, ContextMenuService,
		//{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
