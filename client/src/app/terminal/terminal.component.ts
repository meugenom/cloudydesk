import { AfterViewInit, Component, ElementRef, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { Terminal } from './terminal';
//import * as Terminal from './terminal-core'; //this is not working //old code for js terminal

import { Store } from '@ngrx/store';
import { WidgetPanel } from '../desktop/store/models/widgetpanel.model';
import { AuthStateInterface } from '../auth/store/models/auth.state.model';
import { FileState } from '../desktop/store/models/file.state.model';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'app-terminal',
	templateUrl: './terminal.component.html',
	styleUrls: ['./terminal.component.sass']
})
export class TerminalComponent implements OnInit, AfterViewInit {

	private email: String;

	constructor(
		private element: ElementRef,
		private store: Store<{ widgetPanel: WidgetPanel, auth: AuthStateInterface, file: FileState }>,
	) {
		this.email = "";
	}

	ngOnInit(): void {
	}

	ngAfterViewInit() {


		//get name from store
		let user = this.store.select(store => store.auth.user);
		if (user != null) {
			user.subscribe(data => {
				if (data.getEmail() != null) {
					this.email = data.getEmail();
				}
			});
		}

		// create terminal
		const term = new Terminal('term');
		term.promptText = "/" + (this.email.length == 0 ? "user" : this.email) + "> ";
		term.setTextColor("white");
		term.cursor.style.background = "white";
		term.input(``);
		term._inputLine.textContent = term.promptText;
	}
}
