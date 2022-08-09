import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ModalService } from '../modal/modal.service';
import { ModService } from '../shared/mod.service';
import { Globals } from '../global';

@Component({
	selector: 'app-taskbar',
	templateUrl: './taskbar.component.html',
	styleUrls: ['./taskbar.component.sass']
})
export class TaskbarComponent implements OnInit {

	constructor(
		private modalService: ModalService,
		private modService: ModService,
		private viewContainerRef: ViewContainerRef,
		public globals: Globals
	
		) { }

	ngOnInit(): void { 
	}

	openModal(id: string) {
		this.modalService.open(id);
	}

	closeModal(id: string) {
		this.modalService.close(id);
	}

	openMod(e: MouseEvent, modTitle: String, modText: String) {
		e.preventDefault();
		this.modService.setRootViewContainerRef(this.viewContainerRef);
		this.modService.addDynamicComponent(modTitle.toString(), modText.toString());
	}

}
