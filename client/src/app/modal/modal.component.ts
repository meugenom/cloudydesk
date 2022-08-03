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
		//console.log(this.element.classList.contains('minimized'))

		//if window minimized
		if(this.element.classList.contains('minimized')){
			this.element.style.width = '600px';
			this.element.style.height = '350px';
			this.element.classList.remove('minimized');

		}else{
			
			//open new window	
			this.element.style.display = 'block';
			this.setNewPosition(this.element);
			this.element.classList.add('app-modal-opened');
			this.element.style.zIndex = 1;
			
			//make taskbar indicator active
			const taskbars = document.getElementsByClassName('taskbar-item')
			for (let i = 0; i < taskbars.length; i++) {
				const el = taskbars[i];
				if(el.getAttribute('data-app') == this.element.id){
					//console.log(el.getElementsByTagName('span')[0].style)
					el.getElementsByTagName('span')[0].style.display = 'inline';
				}
			}
		}
    }

	//default settings for window
	/*
	width: 600px;
	height: 350px;
	top: calc(15% + 0px);
	left: 405px;
	*/

    // close modal
    close(): void {
        this.element.style.display = 'none';
		
		this.element.classList.remove('app-modal-opened');
		this.element.classList.remove('focused');
		this.element.style.zIndex = 0;
		
		//default 
		this.element.style.width = '600px';
		this.element.style.height = '350px';
		this.element.style.top = 'calc(15% + 0px)';
		this.element.style.left = '405px';

		//need focus on previous opened window
		const opened = document.getElementsByClassName('app-modal-opened');
		if(opened.length != 0){
			console.log(opened)
			opened[opened.length - 1].classList.add('focused')
		}

		//make taskbar indicator inactive
		const taskbars = document.getElementsByClassName('taskbar-item')
		for (let i = 0; i < taskbars.length; i++) {
			const el = taskbars[i];
			if(el.getAttribute('data-app') == this.element.id){
				//console.log(el.getElementsByTagName('span')[0].style)
				el.getElementsByTagName('span')[0].style.display = '';
			}
		}

    }

	minimize():void {
		//minimized window
		//console.log('minimize')
		this.element.style.width = '0px';
		this.element.style.height = '0px';
		this.element.classList.add('minimized');
	}

	maximize():void{
		//if window was maximized
		if(this.element.classList.contains('maximized')){
			this.element.classList.remove('maximized');
			this.element.style.top = 'calc(15% + 0px)';
			this.element.style.left = '405px';
			this.element.style.width = '600px';
			this.element.style.height = '350px';
		}else{
			this.element.style.top = 0;
			this.element.style.left = 0;
			const calcWidth =  document.body.clientWidth
			const calcHeight = document.body.clientHeight;
			this.element.style.width = calcHeight + 'px';
			this.element.style.height = calcWidth + 'px';
			this.element.classList.add('maximized');
			console.log("width = " + document.body.clientWidth)
			console.log("height = " + document.body.clientHeight)
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

		//window isn't opened and last window is not maximized
		if(!flag && opened.length != 0 && !focused[0].classList.contains('maximized')){
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