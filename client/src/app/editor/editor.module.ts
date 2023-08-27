import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEditorModule } from 'ngx-editor';
import { FileMenuComponent } from './components/file-menu/file-menu.component';
import { EditorService } from './editor.service';

@NgModule({
  declarations: [
    EditorComponent,
    FileMenuComponent
    ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    NgxEditorModule
    ],
  exports: [EditorComponent],
  providers: [EditorService]
})
export class EditorModule {}
