import { Component, OnInit, Input } from '@angular/core';
import { Globals } from '../global'


@Component({
	selector: 'div[app-file]',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.sass']
})
export class FileComponent implements OnInit {

	files: any[]
	@Input() id: number | undefined;
	@Input() name: String | undefined;
	@Input() type: String | undefined;
	@Input() uid: number | undefined;
	@Input() path: String | undefined;
	@Input() size: number | undefined;
	@Input() created: string | undefined;
	@Input() modified: string | undefined;
	@Input() charset: string | undefined;
	@Input() style: string | undefined;
	@Input() dragstart: boolean | undefined;
	
	constructor(
		public globals: Globals
	) {

		this.style = "filter: drop-shadow(1px 1px 1px rgba(102, 102, 102, 0.5));"
		this.files = globals.files;
		this.dragstart = false;

	}

	ngOnInit(): void { }

	returnUpdatedList(data: any) {
		this.files  = data;
	  }

	/**
	 * function uuid(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
	  const r = (Math.random() * 16) | 0;
	  const v = c == 'x' ? r : (r & 0x3) | 0x8;
	  return v.toString(16);
	});
  }
	 */
}
