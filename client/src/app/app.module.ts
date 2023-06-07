import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopComponent } from './desktop/desktop.component';
import { DesktopFullscreenDirective } from './desktop-fullscreen/desktop-fullscreen.directive';
import { UploadingDirective } from './uploading/uploading.directive';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { FinderComponent } from './finder/finder.component';
import { DrawComponent } from './draw/draw.component';
import { TerminalComponent } from './terminal/terminal.component';

import { CameraComponent } from './camera/camera.component';
import { SettingsComponent } from './settings/settings.component';

import { DesktopFileListModule } from './desktop-file-list/desktop-file-list.module';
import { FinderFileListModule } from './finder-file-list/finder-file-list.module';

import { EditorComponent } from './editor/editor.component';


//global values
import { Globals } from './global';

//modals
import { ModComponent } from './mod/mod.component';
import { ModService } from './mod/mod.service';

//context menu
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuService } from './context-menu/context-menu.service';

//spinner
import { SystemLoaderComponent } from './system-loader/system-loader.component';

//loading interceptor
import { LoadingInterceptor } from './loader/loading.interceptor';

//devtools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment

//auth
import { AuthModule } from './auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpConfigInterceptor } from './auth/interceptors/httpconfig.interceptor';
import { AuthenticateComponent } from './auth/components/authenticate/authenticate.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LogoutComponent } from './auth/components/logout/logout.component';
import { AuthGuard } from './auth/services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DesktopModule } from './desktop/desktop.module';
import { WidgetPanelComponent } from './widget-panel/widget-panel.component';
import { ClockComponent } from './clock/clock.component';
import { UploadingComponent } from './uploading/uploading.component';
import { uploadingModule } from './uploading/uploading.module';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';
import { MobileComponent } from './mobile/mobile.component';

import { NgxEditorModule } from 'ngx-editor';
import { FileMenuComponent } from './file-menu/file-menu.component';


@NgModule({
	declarations: [
		AppComponent,
		DesktopComponent,
		DesktopFullscreenDirective,
		TaskbarComponent,
		FinderComponent,
		DrawComponent,
		TerminalComponent,
		EditorComponent,
		CameraComponent,
		SettingsComponent,
		ModComponent,
		ContextMenuComponent,
		SystemLoaderComponent,
		AuthenticateComponent,
		RegisterComponent,
		LogoutComponent,
		UploadingDirective,
		WidgetPanelComponent,
		ClockComponent,
		UploadingComponent,
  		NotificationComponent,
    MobileComponent,
    FileMenuComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		DesktopFileListModule,
		FinderFileListModule,
		uploadingModule,
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
		NgxEditorModule
	],
	providers: [ModService, Globals, ContextMenuService,
		{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
		AuthGuard,
		NotificationService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
