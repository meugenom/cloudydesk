import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
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
	
	}
}
