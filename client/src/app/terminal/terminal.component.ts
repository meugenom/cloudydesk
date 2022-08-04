import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.sass']
})
export class TerminalComponent implements OnInit, AfterViewInit {


  	constructor(private modalService: ModalService, private element: ElementRef) { 
	}

  	ngOnInit(): void {
		
	}

	ngAfterViewInit() {
	
	}

	//modals
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
}
