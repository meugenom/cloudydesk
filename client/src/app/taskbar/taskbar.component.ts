import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ModService } from '../mod/mod.service';
import { Globals } from '../global';
import { Store } from '@ngrx/store';
import { AuthStateInterface } from '../auth/store/models/auth.state.model';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
	selector: 'app-taskbar',
	templateUrl: './taskbar.component.html',
	styleUrls: ['./taskbar.component.sass']
})
export class TaskbarComponent implements OnInit {

	isAuth: boolean = false;

	constructor(
		private modService: ModService,
		private viewContainerRef: ViewContainerRef,
		public globals: Globals,
		private store: Store<{ auth: AuthStateInterface}>,
		private ntfService: NotificationService
		) { 
			this.store.subscribe((data: any) => {
				if(data.auth.isSubmitting){
					this.isAuth = true;
				}else{
					this.isAuth = false;
				}
			});

		}

	ngOnInit(): void { 		
	}
	
	openMod(e: MouseEvent, id: String, name: String) {
		e.preventDefault();

		this.modService.setRootViewContainerRef(this.viewContainerRef);
		this.modService.addDynamicComponent(id.toString(), name.toString());

		/**
		 * Lazy load editor module and editor service
		 */
		if(id=='editor'){
			//lazy load module and service
			import('../editor/editor.module').then(m => {			
				console.log('Lazy module loaded');
		  	});

			import ('../editor/editor.service').then(m => {
				console.log('Lazy service loaded');
		  	});
		}
	}

	notify() {
		setTimeout(() => {
			this.ntfService.error('Please Login or Register to continue');
		}, 300);
	}

}
