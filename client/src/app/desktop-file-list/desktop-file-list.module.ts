import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';
import { DesktopFileListComponent } from "./desktop-file-list.component";
import { HttpClientModule } from '@angular/common/http';
import { fileReducer } from '../desktop/store/reducers/file.reducer';
import { StoreModule } from '@ngrx/store';
import { FileService } from './services/file.service'

@NgModule({

	imports: [
		BrowserModule,
		FormsModule,
		CommonModule,
		HttpClientModule,
		StoreModule.forRoot({ files : fileReducer }),
		DragulaModule.forRoot(),
	],
	declarations: [
		DesktopFileListComponent,
	],
	exports: [
		DesktopFileListComponent
	],
	providers: [
		FileService,
	]

})
export class DesktopFileListModule { }
