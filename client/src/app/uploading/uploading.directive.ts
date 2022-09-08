import { Directive, HostListener, Renderer2 } from '@angular/core';

@Directive({
	selector: 'li[UploadingFile]'
})
export class UploadingDirective {

	constructor() {
	}


	@HostListener('click', ['$event.target'])
	onClick() {
		const uploadingContainer = document.getElementsByClassName("uploading-container")[0];
		uploadingContainer.classList.remove('uploading-container-invisible')
		uploadingContainer.classList.add('uploading-container-visible')

		//click for opening system file browser to choosing of a file
		const fileUploadBrowser = document.getElementById("file-upload-browser-open")?.click();
	}

	open() {


	}

	close() {

	}

}
