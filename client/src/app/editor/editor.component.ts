import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import jsonDoc from './doc';


@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.sass'],
	encapsulation: ViewEncapsulation.None,
})

export class EditorComponent implements OnInit, OnDestroy {
	
	editordoc = jsonDoc;

	editor: Editor | any;
	toolbar: Toolbar = [
		['bold', 'italic'],
		['underline', 'strike'],    
		['code', 'blockquote'],    
		['ordered_list', 'bullet_list'],    
		[{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],    
		['text_color', 'background_color'],
		['link', 'image'],       
		['align_left', 'align_center', 'align_right', 'align_justify'],  ];
	
	showFileMenu = false;
	showEditMenu = false;
	showViewMenu = false;
	showHelpMenu = false;

	constructor() {
	}

	toggleFileMenu() {
		this.showFileMenu = !this.showFileMenu;
	}

	toggleEditMenu() {
		this.showEditMenu = !this.showEditMenu;
	}

	toggleViewMenu() {
		this.showViewMenu = !this.showViewMenu;
	}

	toggleHelpMenu() {
		this.showHelpMenu = !this.showHelpMenu;
	}

	form = new FormGroup({
		editorContent: new FormControl(
		  { value: jsonDoc, disabled: false },
		  Validators.required()
		),
	});
	
	get doc(): any {
		return this.form.get('editorContent');
	}
	

	ngOnInit(): void {
		this.editor = new Editor();
	}

	ngOnDestroy(): void {
		this.editor.destroy();
	  }

	openFile() {
	}

	editFile() {
	}

	saveFile() {
	}

}
