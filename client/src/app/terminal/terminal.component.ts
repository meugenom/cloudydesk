import { AfterViewInit, Component, ElementRef, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { Terminal } from './terminal';

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
		//const term = new Terminal('term');
		const term = new Terminal('term');
		term.promptText = "/user> ";
		term.setTextColor("white");
		term.cursor.style.background = "white"
		term.input(``);
		term._inputLine.textContent = term.promptText;

	}

}
