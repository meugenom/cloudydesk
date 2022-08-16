import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewEncapsulation, ElementRef, HostListener } from "@angular/core";
import { ModService } from "./mod.service";
import { Globals } from "../global";


const enum Status {
	OFF = 0,
	RESIZE = 1,
	MOVE = 2
}

@Component({
	selector: "app-mod",
	templateUrl: "./mod.component.html",
	styleUrls: ["./mod.component.sass"],
	encapsulation: ViewEncapsulation.None
})
export class ModComponent implements OnInit, AfterViewInit {

	@Input() name: string | undefined;
	@Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
	@Input() id!: string;
	@Input() folder: String;

	private element: any;
	public status: Status = Status.OFF;

	//moving window on the desktop
	moving = false
	resizing = false
	shift = { x: 0, y: 0 }
	styleArr : String[];

	constructor(
		private el: ElementRef,
		private modService: ModService,
		private globals : Globals
		) {

		this.element = el.nativeElement;
		this.folder = this.globals.currentDesktopFolder;
		this.styleArr = [];

	}


	ngOnInit(): void {

		// ensure id attribute exists
		if (!this.id) {
			console.log(this)
			console.error('modal must have an id');
			return;
		}

		//open new window
		//set up <app-mod></app-mod> block
		this.element.classList.add('app-modal-opened');
		this.element.classList.add('scale-in-center');

		this.element.childNodes[0].style.minWidth = '300px';
		this.element.childNodes[0].style.minHeight = '200px';
		this.element.childNodes[0].style.width = '600px';
		this.element.childNodes[0].style.height = '350px';
		this.element.childNodes[0].style.top = 'calc(15% + 0px)';
		this.element.childNodes[0].style.left = '405px';
		this.element.childNodes[0].style.zIndex = '1';


		//set new position for new window +30px top and +30px left
		this.setNewPosition();

		//make taskbar indicator active
		const taskbar = document.getElementsByClassName('taskbar-item')
		//console.log(taskbar);
		for (let i = 0; i < taskbar.length; i++) {
			const el = taskbar[i];
			//console.log(el.getAttribute('data-app'))
			if (el.getAttribute('data-app') == this.id) {
				//console.log(el.getElementsByTagName('span')[0].style)
				el.getElementsByTagName('span')[0].style.display = 'inline';
			}
		}

	}

	/**
	 * add current component to modals store through the mod service
	 */
	ngAfterViewInit(): void {
		//console.log('Add element to modals store')
		this.modService.add(this);
	}



	// remove self from modal service when component is destroyed
	ngOnDestroy(): void { }

	/**
	 * set modal active, when it was minimized before or by click on the window
	 */
	active(): void {
		//console.log(this.element.classList)

		//if window minimized and saved in the store
		if (this.element.classList.contains('minimized')) {

			this.element.childNodes[0].style.minWidth = '300px'; //we need this hack for resizing
			this.element.childNodes[0].style.minHeight = '200px'; //we need this hack for resizing
			this.element.childNodes[0].style.width = '600px';
			this.element.childNodes[0].style.height = '350px';
			this.element.childNodes[0].style.top = 'calc(15% + 0px)';
			this.element.childNodes[0].style.left = '405px';
			this.element.childNodes[0].classList.remove('minimized');


		} else {
			//when window hasn't minimized state and need to be again active 
			//this.setNewPosition();
			//this.element.classList.add('app-modal-opened');
			//this.element.classList.add('scale-in-center');

			
			let opened = document.getElementsByClassName('app-modal-opened');
			//for all modals are state z-index = 0
			for (var i = 0; i < opened.length; i++) {
				//console.log(opened[i].children[0].attributes)
				if(opened[i].children[0].attributes != null){
					//opened[i].children[0].setAttribute('style', 'z-Index: 0;')
					//console.log(opened[i].children[0].getAttribute('style'))
					let style = opened[i].children[0].getAttribute('style');
					//console.log(style)
					//min-width: 300px; min-height: 200px; width: 600px; height: 350px; top: calc(15% + 0px); left: 405px; z-index: 1;
					//we need to change last digit from 1 to 0 and set to the attributes again
					style = style?.substring(0, style.length - 2)+"0;"
					//console.log(style)
					opened[i].children[0].setAttribute('style', style);
				}
			}
			//remove focused from the last
			let focused = document.getElementsByClassName('focused');
			//console.log('focused:')
			//console.log(focused[0])

			//for (let index = 0; index < focused.length; index++) {
			//	if(focused[i] != null){
			//		//console.log(focused[0])
					focused[0].classList.remove('focused')
			//	}
			//}
			
			this.element.classList.add('focused')
			this.element.childNodes[0].style.zIndex = 1;
		}
	}


	/**
	 * close the window and calculate state for previous window and move focus
	 * @param event 
	 */
	close(event: Event) {

		//need focus on previous opened window
		const opened = document.getElementsByClassName('app-modal-opened');
		if (opened.length != 0) {
			let index = 0;
			for (let i = opened.length - 1; i > 0; i--) {
				let id = opened[i].children[0].getAttribute('id');
				if(id != this.id){
					//first i is not element which needs to delete
					index = i;
					break;
				}	
			}
			
			opened[index].classList.add('focused')
			let style = opened[index].children[0].getAttribute('style');
			//console.log(style)
			//min-width: 300px; min-height: 200px; width: 600px; height: 350px; top: calc(15% + 0px); left: 405px; z-index: 1;
			//we need to change last digit from 1 to 0 and set to the attributes again
			style = style?.substring(0, style.length - 2)+"1;"
			//console.log(style)
			opened[index].children[0].setAttribute('style', style);

		}

		//make taskbar indicator inactive
		const taskbars = document.getElementsByClassName('taskbar-item')
		for (let i = 0; i < taskbars.length; i++) {
			const el = taskbars[i];
			if (el.getAttribute('data-app') == this.id) {
				//console.log(el.getElementsByTagName('span')[0].style)
				el.getElementsByTagName('span')[0].style.display = '';
			}
		}

		this.closeModal.emit(event); //automatic removing from modals from dom and store

	}
	/**
	 * minimize the window and 
	 */
	minimize(): void {
		//minimized window
		console.log('minimized')
		//console.log(this.element.childNodes[0])
		this.element.classList.add('minimized');
		this.element.childNodes[0].style.minWidth = '0px';
		this.element.childNodes[0].style.minHeight = '0px';
		this.element.childNodes[0].style.width = '0px';
		this.element.childNodes[0].style.height = '0px';
	}

	/**
	 * maximize the window and set normal state when click on the button twice
	 */
	maximize(): void {

		//if window was maximized -> to normal state
		if (this.element.classList.contains('maximized')) {

			this.element.classList.remove('maximized');

			this.element.childNodes[0].style.top = 'calc(15% + 0px)';
			this.element.childNodes[0].style.left = '405px';
			this.element.childNodes[0].style.width = '600px';
			this.element.childNodes[0].style.height = '350px';

		} else {
			//when window get maximization at the first
			this.element.classList.add('maximized');

			this.element.childNodes[0].style.top = 0;
			this.element.childNodes[0].style.left = 0;
			const calcWidth = document.body.clientWidth
			const calcHeight = document.body.clientHeight;
			this.element.childNodes[0].style.width = calcWidth + 'px';
			this.element.childNodes[0].style.height = calcHeight + 'px';

			//console.log("width = " + document.body.clientWidth)
			//console.log("height = " + document.body.clientHeight)
		}
	}
	/**
	 * return new position for next window 
	 */
	setNewPosition() {

		if (this.modService.modals.length > 0) {

			let opened = document.getElementsByClassName('app-modal-opened');
			let focused = document.getElementsByClassName('focused');

			//console.log(opened)
			//console.log(focused)

			//view opened windows
			let flag: boolean = false;
			for (var i = 0; i < opened.length; i++) {
				console.log(opened[i].children[0].getAttribute('id'))
				if(opened[i].children[0].getAttribute('id') != null){
					if ((opened[i].children[0].getAttribute('id')) == this.id) {
						//	console.log('opened windows and flag is true')
						//console.log(opened[i]);
						flag = true;
						break;
					}
				}
			}


			//for all modals are state z-index = 0
			for (var i = 0; i < opened.length; i++) {
				//console.log(opened[i].children[0].attributes)
				if(opened[i].children[0].attributes != null){
					//opened[i].children[0].setAttribute('style', 'z-Index: 0;')
					//console.log(opened[i].children[0].getAttribute('style'))
					let style = opened[i].children[0].getAttribute('style');
					//console.log(style)
					//min-width: 300px; min-height: 200px; width: 600px; height: 350px; top: calc(15% + 0px); left: 405px; z-index: 1;
					//we need to change last digit from 1 to 0 and set to the attributes again
					style = style?.substring(0, style.length - 2)+"0;"
					//console.log(style)
					opened[i].children[0].setAttribute('style', style);
				}
			}

			//window isn't opened and last window is not maximized
			if (!flag && opened.length != 0 && !focused[0].classList.contains('maximized')) {
			//if (opened.length != 0 && !focused[0].classList.contains('maximized')) {
				//get position for a last opened window
				//console.log('top:')
				focused[0].childNodes[0];
				

				const rect = focused[0].children[0].getBoundingClientRect();
				//console.log('rect top = '+rect.top)
				//console.log('rect left = '+rect.left)

				focused[0].classList.remove('focused')

				this.element.childNodes[0].style.top = ((Number(rect?.top.toFixed()) + 30) + 'px')
				this.element.childNodes[0].style.left = ((Number(rect?.left.toFixed()) + 30) + 'px')
			}

		}
		//open the first window with default css settings
		//make nothing 
		this.element.classList.add('focused')
		this.element.childNodes[0].style.zIndex = 1;

	}


	/**
	 * moving modals
	 * @param event 
	 */
	startMove(event: MouseEvent, status: number) {

		if (status == 2) {
			let target: any = event.currentTarget
			let position = getPosition(target);
			this.shift = {
				x: event.pageX - position.left,
				y: event.pageY - position.top
			}
			this.moving = true
		}

		if (status == 1) {
			event.stopPropagation();
			this.resizing = true;
		}

		if (status == 0) {
			event.stopPropagation();
			this.resizing = false;
			this.moving = false;
		}

	}


	@HostListener("document:mousedown", ["$event"])
	//@HostListener("document:touchend", ["$event"])
	down(event: MouseEvent) {
		//console.log('mouse down')
		this.resizing = false;
	}


	@HostListener("document:mousemove", ["$event"])
	//@HostListener("document:touchstart", ["$event"])
	move(event: MouseEvent) {

		//console.log(event.type)
		if (this.moving && event.type != 'click') {
			if (event.clientY - this.shift.y > 0 && event.clientX - this.shift.x > 0) {

				this.element.childNodes[0].style.top = (event.clientY - this.shift.y) + 'px';
				this.element.childNodes[0].style.left = (event.clientX - this.shift.x) + 'px';
			}
		}

		if (this.resizing && event.type != 'click') {
			if (event.clientY > 0 && event.clientX > 0) {
				//find current left and top of the modal window
				let top = this.element.childNodes[0].getBoundingClientRect().top;
				let left = this.element.childNodes[0].getBoundingClientRect().left;

				//resize element
				this.element.childNodes[0].style.width = event.clientX - left + 'px';
				this.element.childNodes[0].style.height = event.clientY - top + 'px';
				//min-width and min-height was set in css (by default 300px and 200px)
			}
		}
	}


	@HostListener("document:mouseup")
	stopMove() {
		this.moving = false;
		this.resizing = false;
	}

}



/**
 * coordinates for moving windows on the desktop
 * @param elem 
 * @returns coordinates of the window
 */
function getPosition(elem: HTMLElement) {
	const box = elem.getBoundingClientRect();

	return {
		top: box.top + scrollY,
		left: box.left + scrollX
	};
}

