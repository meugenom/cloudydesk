import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopComponent } from './desktop/desktop.component';
import { Fullscreen } from './fullscreen/fullscreen.directive';
import { TaskbarComponent } from './taskbar/taskbar.component';

import { ModalModule } from './modal/modal.module';
import { ExplorerComponent } from './explorer/explorer.component';
import { DrawComponent } from './draw/draw.component';
import { TerminalComponent } from './terminal/terminal.component';
import { EditorComponent } from './editor/editor.component';
import { CameraComponent } from './camera/camera.component';
import { SettingsComponent } from './settings/settings.component';
import { ModComponent } from './mod/mod.component';
import { ModService } from './shared/mod.service';

import { DragDropSwapDirective } from './desktop/drag-drop-swap.directive';



@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
	Fullscreen,
 	TaskbarComponent,
  	ExplorerComponent,
  	DrawComponent,
  	TerminalComponent,
  	EditorComponent,
  	CameraComponent,
  	SettingsComponent,
   ModComponent,
   DragDropSwapDirective
  ],
  imports: [
    AppRoutingModule,
	BrowserModule,
	ModalModule,
	HttpClientModule,
	FormsModule
  ],
  providers: [ModService],
  bootstrap: [AppComponent]
})
export class AppModule { }
