import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ModService } from '../mod/mod.service';
import { Globals } from '../global';

@Component({
	selector: 'app-taskbar',
	templateUrl: './taskbar.component.html',
	styleUrls: ['./taskbar.component.sass']
})
export class TaskbarComponent implements OnInit {

	constructor(
		private modService: ModService,
		private viewContainerRef: ViewContainerRef,
		public globals: Globals
	
		) { }

	ngOnInit(): void { 
	}
	
	openMod(e: MouseEvent, id: String, name: String) {
		e.preventDefault();
		this.modService.setRootViewContainerRef(this.viewContainerRef);
		this.modService.addDynamicComponent(id.toString(), name.toString());
	}

}
