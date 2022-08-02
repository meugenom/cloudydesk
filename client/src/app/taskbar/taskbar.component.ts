import { Component, OnInit } from '@angular/core';

import { ModalService } from '../modal/modal.service';

@Component({
	selector: 'app-taskbar',
	templateUrl: './taskbar.component.html',
	styleUrls: ['./taskbar.component.sass']
})
export class TaskbarComponent implements OnInit {

	constructor(private modalService: ModalService) { }

	ngOnInit(): void {
	}

	openModal(id: string) {
		this.modalService.open(id);
	}

	closeModal(id: string) {
		this.modalService.close(id);
	}

}
