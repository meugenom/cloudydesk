import { AfterViewInit, Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import SelectionArea from "@viselect/vanilla";
import { Globals } from '../global';

@Component({
	selector: 'app-desktop',
	providers: [ Globals ],
	templateUrl: './desktop.component.html',
	styleUrls: ['./desktop.component.sass'],
})
export class DesktopComponent implements AfterViewInit{

	fullScreen: boolean;

	@ViewChild('container') input: ElementRef | undefined;


	constructor(private renderer: Renderer2, public globals: Globals) {
		this.fullScreen = this.globals.fullScreen;
	}


	//begin select cells
	ngAfterViewInit() {

		//console.log(this.input?.nativeElement);

		for (let i = 0; i < 400; i++) {
			const div = document.createElement("div");
			div.style.background = '#aaccff'
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
						el.attributes[1].value = "background-color: ; border-radius: 0.25rem;"
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
						el.attributes[1].value = "background-color: #5f9efc; border-radius: 0.25rem;"
					}

					for (const el of removed) {
						el.classList.remove("selected");
						//el.attributes[1].value = "background-color: #aaccff; border-radius: 0.25rem;"
						el.attributes[1].value = "background-color: ; border-radius: 0.25rem;"
					}
				}
			)
			.on("stop", ({ store: { stored } }) => console.log(stored.length));
	}
}

