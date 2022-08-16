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

import { FileListModule } from './file-list/file-list.module'

//global values
import { Globals } from './global';

//modals
import { ModComponent } from './mod/mod.component';
import { ModService } from './mod/mod.service';

//popovers
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuService } from './context-menu/context-menu.service';

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
		ContextMenuComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		HttpClientModule,
		FormsModule,
		FileListModule
	],
	providers: [ModService, Globals, ContextMenuService],
	bootstrap: [AppComponent]
})
export class AppModule { }
