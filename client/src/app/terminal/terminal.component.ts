import { AfterViewInit, Component, ElementRef, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import * as Terminal from './terminal-core';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'app-terminal',
	templateUrl: './terminal.component.html',
	styleUrls: ['./terminal.component.sass']
})
export class TerminalComponent implements OnInit, AfterViewInit {

	constructor(private element: ElementRef) {
	}

	ngOnInit(): void {

	}

	ngAfterViewInit() {
		const t1 = new Terminal('term');
		t1.promptText = "/user> ";
		t1.setTextColor("white");
		t1._cursor.style.background = "white"
		t1.input(``);
		t1._inputLine.textContent = t1.promptText;

	}

}
