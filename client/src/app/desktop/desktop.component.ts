import { identifierName } from '@angular/compiler';
import { AfterViewInit, Component, HostListener, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
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

		//console.log(window.innerWidth)
		//console.log(window.innerHeight)
		const filesInRow : number = window.innerWidth/110

		//need to know numbers of icons

		for (let i = 0; i < 20; i++) {
			const div : HTMLElement = document.createElement("div");
			div.classList.add('item')
			div.setAttribute('id', "item-" + i.toString())
			this.input?.nativeElement.appendChild(div);
		}
		
		//viselect
		const selection = new SelectionArea({
			selectables: [".item-container > div"],
			boundaries: [".item-container"]

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
