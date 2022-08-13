import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-explorer',
	templateUrl: './explorer.component.html',
	styleUrls: ['./explorer.component.sass']
})
export class ExplorerComponent implements OnInit {

	path : String;
	

	constructor() { 
			this.path = 'desktop';
		}

	
	
	ngOnInit(): void {

	}

	//modals
	/*
	openModal(id: string) {
		this.modalService.open(id);
	}

	closeModal(id: string) {
		this.modalService.close(id);
	}

	minimizeModal(id : string){
		this.modalService.minimize(id);
	}

	maximizeModal(id : string){
		this.modalService.maximize(id);
	}
	*/

}
