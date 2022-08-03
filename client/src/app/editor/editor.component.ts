import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements OnInit {

	constructor(private modalService: ModalService) { }

	ngOnInit(): void {
	}


	//modals
	openModal(id: string) {
		this.modalService.open(id);
	}

	closeModal(id: string) {
		this.modalService.close(id);
	}


}
