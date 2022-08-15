import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopComponent } from './desktop/desktop.component';
import { FullscreenDirective } from './fullscreen/fullscreen.directive';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { FinderComponent } from './finder/finder.component';
import { DrawComponent } from './draw/draw.component';
import { TerminalComponent } from './terminal/terminal.component';
import { EditorComponent } from './editor/editor.component';
import { CameraComponent } from './camera/camera.component';
import { SettingsComponent } from './settings/settings.component';
import { ModComponent } from './mod/mod.component';
import { ModService } from './mod/mod.service';
import { FileListModule } from './file-list/file-list.module'

//global values
import { Globals } from './global';

//editors


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
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		HttpClientModule,
		FormsModule,
		FileListModule
	],
	providers: [ModService, Globals],
	bootstrap: [AppComponent]
})
export class AppModule { }
