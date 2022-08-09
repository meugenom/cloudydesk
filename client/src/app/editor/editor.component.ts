import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../modal/modal.service';


@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.sass']
})

export class EditorComponent implements OnInit {
	text1 = ``;
	
	constructor(private modalService: ModalService) { }


	ngOnInit(): void {
	}


}
