import { Component, HostListener, OnInit, ElementRef, Renderer2, ViewChild, ViewContainerRef, OnDestroy, EventEmitter, Output } from '@angular/core';
import SelectionArea from "@viselect/vanilla";
import { Globals } from '../global';
import { ModService } from '../mod/mod.service';
import { ContextMenuService } from '../context-menu/context-menu.service';

import { Store } from '@ngrx/store';
import { WidgetPanel } from '../desktop/store/models/widgetpanel.model';
import { OpenPanel } from '../desktop/store/actions/widgetpanel.action';
import { AuthStateInterface } from '../auth/store/models/auth.state.model';
import { AuthService } from '../auth/services/auth.service';
import { checkUserAction} from '../auth/store/actions/auth.action';
import { FileState } from './store/models/file.state.model';
import { loadFiles } from './store/actions/file.actions';
import { Router } from '@angular/router';
import { 
	WIDGET_PANEL_INITIAL_STATE,
	WIDGET_PANEL_OPEN_LOGIN_FORM,
	WIDGET_PANEL_CLOSE_LOGIN_FORM,
	WIDGET_PANEL_OPEN_REGISTER_FORM,
	WIDGET_PANEL_CLOSE_REGISTER_FORM,
	WIDGET_PANEL_OPEN_LOGOUT_FORM,
	WIDGET_PANEL_CLOSE_LOGOUT_FORM,
	WIDGET_PANEL_IS_ACTIVE,
	WIDGET_PANEL_IS_NOT_ACTIVE
} from './store/models/widgetpanel.constants'

@Component({
	selector: 'app-desktop',
	templateUrl: './desktop.component.html',
	styleUrls: ['./desktop.component.sass'],
})
export class DesktopComponent {

	fullScreen: boolean;
	
	//props for file-list component
	showFolderPath: string = '';
	showFolderId: string = '';

	@ViewChild('container') input: ElementRef | undefined;
	dragDrop: boolean = false;

	email: String;
	isActive: boolean;
	isLoginForm: boolean;
	isRegisterForm: boolean;

	constructor(
		private modService: ModService,
		private authService: AuthService,
		private contextMenuService: ContextMenuService,
		private viewContainerRef: ViewContainerRef,
		private globals: Globals,
		private element: ElementRef,
		private store: Store<{ widgetPanel: WidgetPanel, auth: AuthStateInterface, file: FileState}>,
		private _router: Router
	) {
		this.fullScreen = this.globals.fullScreen;
		this.isLoginForm = false;
		this.isRegisterForm = false;
		this.isActive = false;
		this.email = "unknown"

		//need check our localstorage and find authtoken
		
		//console.log(isAuthenticated);
		
		//if(!isAuthenticated){

			//feature for the reloads or first time loading
			this.store.dispatch((checkUserAction()));
			
		//}

		
		store.select('auth').subscribe(data => {

			this.isRegisterForm = false;
			
			//widget doesn't closed after logging
			//this.isActive = false;

			if(data.isSubmitting){
				this.isLoginForm = false;
				this.email = data.user['email'];
				console.log(data);
			}else{
				this.email = "unknown"
				this.isLoginForm = true;
			}
				
				const widgetpanel: WidgetPanel = {
					isActive: this.isActive,
					isLoginForm: this.isLoginForm,
					isRegisterForm: this.isRegisterForm,
					lastAction: WIDGET_PANEL_OPEN_LOGIN_FORM,
					lastActionDate: new Date()
				}
		
				this.store.dispatch(OpenPanel(widgetpanel))
				
				//get new file list for current user
				this.store.dispatch((loadFiles()))
			
		})

		store.select('widgetPanel').subscribe(data => {
			//console.log(data);
			this.isActive = data.isActive;
		})
	}

	getFullScreen() {
		this.fullScreen = this.globals.fullScreen
	}

	getMobileView(){
		this._router.navigate(['mobile-component'])
	}

	//open widgets panel 
	openWidgetsPanel(){
			
		const widgetpanel: WidgetPanel = {
			isActive: !this.isActive,
			isLoginForm: this.isLoginForm,
			isRegisterForm: this.isRegisterForm,
			lastAction: this.isActive ? WIDGET_PANEL_IS_NOT_ACTIVE : WIDGET_PANEL_IS_ACTIVE,
			lastActionDate: new Date()
		}

		this.store.dispatch(
			OpenPanel(
				widgetpanel))
	}

	//for context menu windows
	openContext(e: MouseEvent, id: string, name: String) {

		e.preventDefault();
		this.contextMenuService.setRootViewContainerRef(this.viewContainerRef);
		this.contextMenuService.addDynamicComponent(id.toString(), name.toString());
	}

	//begin select cells
	ngAfterViewInit() {

		//viselect

		const selection = new SelectionArea({
			selectables: [".item-container > div"],
			boundaries: [".item-container"]

		})
		.on("beforestart", ({ store: { stored }, event, selection }) => {

			//if we need stop to move select area
			console.log('before start')
			// in js we have event.target.tagName 
			//but ts needs default handler, so !important
			if (event != null) {
				if (event.target instanceof Element) {

					//console.log(event.target.classList)

					if (event.target.classList.contains('item-icon-icon') ||
						event.target.classList.contains('item-badges') ||
						event.target.classList.contains('item-name')
					) {
						this.dragDrop = true;
					} else {
						this.dragDrop = false;
					}
				}
			}

		})
			.on("start", ({ store, event, selection }) => {

				//hardcore
				if (this.dragDrop == true) {
					selection.cancel()
				}

				//console.log(event)
				if (!(event as MouseEvent).ctrlKey && !(event as MouseEvent).metaKey) {
					for (const el of store.stored) {
						el.classList.remove("selected");
						el.children[0].children[1].children[0].classList.remove('item-icon-icon-selected')

					}
					selection.clearSelection();
				}
			})
			.on(
				"move",
				({
					store: {
						changed: { added, removed },

					},
					event,
					selection
				}) => {

					//hardcore
					if (this.dragDrop == true) {
						selection.cancel()
					}

					for (const el of added) {

						el.classList.add("selected");
						el.children[0].children[1].children[0].classList.add('item-icon-icon-selected')

					}

					for (const el of removed) {

						el.classList.remove("selected");
						el.children[0].children[1].children[0].classList.remove('item-icon-icon-selected')
					}
				}
			)
			.on("stop", ({ store: { stored } }) => {
				//console.log('stored length = ' + stored.length);
			});

		//this.globals.selection = selection;

	}


}

