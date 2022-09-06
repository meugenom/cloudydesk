import { HttpClient, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Subscription } from 'rxjs';
import { loadFiles } from '../desktop/store/actions/file.actions';
import { FileState } from '../desktop/store/models/file.state.model';
import { Globals } from '../global';
import { ContextMenuService } from './context-menu.service';

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

	//file uploading
	fileName = '';
	uploadProgress: number | undefined;
	uploadSub: Subscription | undefined;

	@Input() requiredFileType: string | undefined;

	private element: any;

	constructor(
		private el: ElementRef,
		private contextMenuService: ContextMenuService,
		private http: HttpClient,
		private store: Store<{file: FileState}>
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
		//this.closeContext.emit(event); //automatic removing context from dom and store
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

		}
	}

	//file uploading
	onFileSelected(event: any) {

		const file: File = event.target.files[0];

		if (file) {

			this.fileName = file.name;
			const formData = new FormData();
			formData.append("file", file);

			console.log(formData);

			const upload$ = this.http.post("http://localhost:3000/api/uploadFile", formData, {
				reportProgress: true,
				observe: 'events'
			})
				.pipe(
					finalize(() => {
						this.reset()
						console.log('Finale Pipes')

						//get new file list for current user
						this.store.dispatch((loadFiles()))
			

						//close context menu
						this.closeContext.emit(event)
					})
				);

			//upload$.subscribe();
			this.uploadSub = upload$.subscribe((event : any)=> {
					if (event.type == HttpEventType.UploadProgress) {
						this.uploadProgress = Math.round(100 * (event.loaded / event.total));
						console.log("upload progress: " + this.uploadProgress)
					}
			})

		}
	}

	cancelUpload() {
		this.uploadSub?.unsubscribe();
		this.reset();
	}

	reset() {
		this.uploadProgress = undefined;
		this.uploadSub = undefined;
	}

}
