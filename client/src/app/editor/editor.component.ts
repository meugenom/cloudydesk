import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.sass']
})

export class EditorComponent implements OnInit {
	text1 = ``;
	
	constructor() { }


	ngOnInit(): void {
	}


}
