import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ContextMenuService } from './context-menu.service';
import { Store } from '@ngrx/store';
import { ContextState } from '../desktop/store/models/context.state.model';
import { Context } from '../desktop/store/models/context.model';
import { AddContext } from '../desktop/store/actions/context.action';
import { FinderState } from '../desktop/store/models/finder.state.model';

@Component({
	selector: 'div[app-context-menu]',
	templateUrl: './context-menu.component.html',
	styleUrls: ['./context-menu.component.sass'],
	encapsulation: ViewEncapsulation.None
})
export class ContextMenuComponent implements OnInit, AfterViewInit {

	@Input() name: string | undefined;
	@Output() closeContext: EventEmitter<any> = new EventEmitter<any>();
	@Input() id!: string;

	private element: any;

	constructor(
		private el: ElementRef,
		private contextMenuService: ContextMenuService,
		private store: Store<{ context: ContextState, finder: FinderState }>,
	) {
		this.element = el.nativeElement;

	}

	ngOnInit(): void {

		// ensure id attribute exists
		if (!this.id) {
			console.log(this)
			console.error('context menu must have an id');
			return;
		}

		//open new context
		//set up <div app-context-menu></div> block
		this.element.classList.add('context-menu');
		this.element.classList.add('scale-in-center');
		this.element.setAttribute('id', this.id)
		this.element.style.display = 'block';


		this.element.style.position = 'absolute';
		this.element.style.overflow = 'hidden';
		this.element.style.whiteSpace = 'nowrap';
		this.element.style.background = '#fff';
		this.element.style.color = '#333';
		this.element.style.borderRadius = '2px';
		this.element.style.padding = '3px 0';
		this.element.style.minWidth = '200px';
		this.element.style.backgroundColor = 'rgba(231, 238, 245, 0.98)';
		this.element.style.border = '1px solid #e4ebf3de';
		this.element.style.boxShadow = '0 0 15px #00000066';

		//need to get from desktop component parent component ...need think
		//this.element.style.top = 'calc(15% + 0px)';
		//this.element.style.left = '405px';

	}

	ngAfterViewInit(): void {
	}

	//if click on the desktop then automatic close opened context menu window
	@HostListener("document:click", ["$event"])
	close(event: Event) {
		this.closeContext.emit(event); //automatic removing context from dom and store
	}

	@HostListener("document:contextmenu", ["$event"])
	setContextPosition(event: Event) {
		console.log('context menu open');

		// in js we have event.target.tagName 
		//but ts needs default handler, so !important
		if (event instanceof MouseEvent) {
			console.log(event.clientX)
			console.log(event.clientY)
			console.log(event)
			this.element.style.top = event.clientY + 'px';
			this.element.style.left = event.clientX + 'px';
			
			//find parent element and some attribute 
			//console.log(event.target)
			let foundElem : any = event.target;
			let path = '';
			let id = '';
			
			this.store.select('finder').subscribe((data: any) => {
				id = data.currentDirId;
			})

			//set store for context
			const context: Context = {
				usedFolder: id,
				usedFile: ''
			}
	
			this.store.dispatch(
				AddContext(
					context))		
			
		}
	}
}
