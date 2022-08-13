import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopComponent } from './desktop/desktop.component';
import { FullscreenDirective } from './fullscreen/fullscreen.directive';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { DrawComponent } from './draw/draw.component';
import { TerminalComponent } from './terminal/terminal.component';
import { EditorComponent } from './editor/editor.component';
import { CameraComponent } from './camera/camera.component';
import { SettingsComponent } from './settings/settings.component';
import { ModComponent } from './mod/mod.component';
import { ModService } from './mod/mod.service';
import { FileListModule } from './file-list/file-list.module'


@NgModule({
	declarations: [
		AppComponent,
		DesktopComponent,
		FullscreenDirective,
		TaskbarComponent,
		ExplorerComponent,
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
	providers: [ModService],
	bootstrap: [AppComponent]
})
export class AppModule { }
