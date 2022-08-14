import { AfterViewInit, Component, HostListener, OnInit, ElementRef, Renderer2, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { Globals } from '../global';
import { ModService } from '../mod/mod.service';

@Component({
	selector: 'app-desktop',
	providers: [Globals],
	templateUrl: './desktop.component.html',
	styleUrls: ['./desktop.component.sass'],
})
export class DesktopComponent{

	fullScreen: boolean;
	showFolder : any = { path: 'Desktop' }

	constructor(
		private modService: ModService,
		private viewContainerRef: ViewContainerRef,
		public globals: Globals) {

		this.fullScreen = this.globals.fullScreen;
	}

	//for modal windows
	openMod(e: MouseEvent, id: String, name: String) {
		e.preventDefault();
		this.modService.setRootViewContainerRef(this.viewContainerRef);
		this.modService.addDynamicComponent(id.toString(), name.toString());
	}

}

