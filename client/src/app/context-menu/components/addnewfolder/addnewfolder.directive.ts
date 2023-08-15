import { Directive, HostListener, Renderer2 } from '@angular/core';

@Directive({
	selector: 'li[AddNewFolder]'
})
export class AddNewFolderDirective {

	constructor() {
	}


	@HostListener('click', ['$event.target'])
	onClick() {		
        console.log("AddNewFolderDirective");
	}

	open() {


	}

	close() {

	}

}
