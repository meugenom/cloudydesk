import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.sass']
})
export class FileComponent implements OnInit {


	files : any[] 
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

  constructor() { 

	this.style = "filter: drop-shadow(1px 1px 1px rgba(102, 102, 102, 0.5));"

	this.files = [{
		id: 0,
		name: 'example.txt',
		type: 'txt',
		uid: 2345689989,
		path: '/user/Desktop/example.txt',
		size: 108000,
		created: '08082022',
		modified: '09082022',
		charset: 'utf-8'
	},
	{
		id: 1,
		name: 'Java.pdf',
		type: 'pdf',
		uid: 2345689345,
		path: '/user/Desktop/Java.pdf',
		size: 108034500,
		created: '08082022',
		modified: '09082022',
		charset: 'utf-8'
	},
	{
		id: 2,
		name: 'set.png',
		type: 'png',
		uid: 234568229809,
		path: '/user/Desktop/set.png',
		size: 1080034340,
		created: '08082022',
		modified: '09082022',
		charset: ''
	}]

  }
  ngOnInit(): void { }

  

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
