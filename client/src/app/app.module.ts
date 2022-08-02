import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopComponent } from './desktop/desktop.component';
import { Fullscreen } from './fullscreen/fullscreen.directive';
import { TaskbarComponent } from './taskbar/taskbar.component';

import { ModalModule } from './modal/modal.module';

@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
	Fullscreen,
 	TaskbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
