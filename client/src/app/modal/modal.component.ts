import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';

import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
	
	@Input()
	id!: string;
    private element: any;


    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        
		// ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
            if (el.target.className === 'app-modal-opened') {
                this.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);

    }


    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
		
		this.setNewPosition(this.element);
		this.element.classList.add('app-modal-opened');
		this.element.style.zIndex = 1;
	
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
		
		this.element.classList.remove('app-modal-opened');
		this.element.classList.remove('focused');
		this.element.style.zIndex = 0;

		//need focus on previous opened window
		const opened = document.getElementsByClassName('app-modal-opened');
		if(opened.length != 0){
			console.log(opened)
			opened[opened.length - 1].classList.add('focused')
		}

    }

	setNewPosition(element: HTMLElement){

		const opened = document.getElementsByClassName('app-modal-opened');
		const focused = document.getElementsByClassName('focused');

		//view opened windows
		let flag : boolean = false;
		for (var i = 0; i < opened.length; i++) {
			//console.log('opened: ', opened[i]);
			if(opened[i].id == element.id){
				flag = true;
				break;
			}
		}
		//for all modals are state z-index = 0
		for (var i = 0; i < opened.length; i++) {
			let c = document.getElementById(opened[i].id);	
			if(c != null){
				c.style.zIndex = "0";
			}
		}

		/* //worked script
		let c = document.getElementById('explorer');
		console.log(c?.style.zIndex)
		console.log("z-index = " + c?.style.zIndex);
		if(c != null){
			c.style.zIndex = "0";
		}
		*/

		//window isn't opened
		if(!flag && opened.length != 0){
			//get position for a last opened window
			const top = focused[0];
			//const zIndex = window.getComputedStyle(top).zIndex;
			//console.log("top z-index = "+zIndex)
			//console.log(top.id);

			top.classList.remove('focused')

			const rect = top.getBoundingClientRect();

			element.style.top = ((Number(rect?.top.toFixed())+ 30)+'px')
			element.style.left = ((Number(rect?.left.toFixed())+ 30)+'px')
		}

		//open the first window with default css settings
		//make nothing 
		element.style.zIndex = '1';
		element.classList.add('focused')

	}
}
