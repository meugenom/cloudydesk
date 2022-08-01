import { Directive, HostListener, Renderer2 } from '@angular/core';
import { Globals } from '../global';

@Directive({
	selector: 'button[counting]'
})
export class Fullscreen {
	
	constructor(private renderer: Renderer2, private globals: Globals) {		
	}

	
	@HostListener('click', ['$event.target'])
	onClick() {
		console.log("Fullscreen = " + this.globals.fullScreen);
		if (this.globals.fullScreen == false) {
			this.openFullscreen();
		} else {
			this.closeFullscreen();
		}
	}

	openFullscreen() {

		// Trigger fullscreen
		const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
			mozRequestFullScreen(): Promise<void>;
			webkitRequestFullscreen(): Promise<void>;
			msRequestFullscreen(): Promise<void>;
		};
		if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
			docElmWithBrowsersFullScreenFunctions.requestFullscreen();
		} else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
			docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
		} else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
			docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
		} else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
			docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
		}
		
		this.globals.fullScreen = true;
	}

	closeFullscreen() {
		const docWithBrowsersExitFunctions = document as Document & {
			mozCancelFullScreen(): Promise<void>;
			webkitExitFullscreen(): Promise<void>;
			msExitFullscreen(): Promise<void>;
		};
		if (docWithBrowsersExitFunctions.exitFullscreen) {
			docWithBrowsersExitFunctions.exitFullscreen();
		} else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
			docWithBrowsersExitFunctions.mozCancelFullScreen();
		} else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
			docWithBrowsersExitFunctions.webkitExitFullscreen();
		} else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
			docWithBrowsersExitFunctions.msExitFullscreen();
		}

		
		this.globals.fullScreen = false;
	}

}
