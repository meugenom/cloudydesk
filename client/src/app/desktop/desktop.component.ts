import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import SelectionArea from "@viselect/vanilla";


@Component({
	selector: 'app-desktop',
	templateUrl: './desktop.component.html',
	styleUrls: ['./desktop.component.sass']
})
export class DesktopComponent implements AfterViewInit {


	fullScreen: boolean = false;

	@ViewChild('container') input: ElementRef | undefined;


	constructor(private renderer: Renderer2) {
	}

	ngAfterViewInit() {

		console.log(this.input?.nativeElement);

		for (let i = 0; i < 400; i++) {
			const div = document.createElement("div");
			//div.style.background =  '#aaccff'
			div.style.border = "dashed"
			div.style.opacity = "0.2"
			div.style.zIndex = "-1"
			div.style.borderRadius = '0.25rem'
			this.input?.nativeElement.appendChild(div);
		}

		//viselect
		const selection = new SelectionArea({
			selectables: [".container > div"],
			boundaries: [".container"]

		})
			.on("start", ({ store, event }) => {
				if (!(event as MouseEvent).ctrlKey && !(event as MouseEvent).metaKey) {
					for (const el of store.stored) {
						el.classList.remove("selected");
						//console.log(el.attributes[1]);
						//el.attributes[1].value = "background-color: #aaccff; border-radius: 0.25rem;"
					}
					selection.clearSelection();
				}
			})
			.on(
				"move",
				({
					store: {
						changed: { added, removed }
					}
				}) => {
					for (const el of added) {
						el.classList.add("selected");
						//el.attributes[1].value = "background-color: #5f9efc; border-radius: 0.25rem;"
					}

					for (const el of removed) {
						el.classList.remove("selected");
						//el.attributes[1].value = "background-color: #aaccff; border-radius: 0.25rem;"
					}
				}
			)
			.on("stop", ({ store: { stored } }) => console.log(stored.length));
	}

	goFullScreen(fullScreen: boolean) {
		if (fullScreen) {
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
		this.fullScreen = true;
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

		this.fullScreen = false;
	}


}

