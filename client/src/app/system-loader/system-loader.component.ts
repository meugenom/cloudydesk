import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { LoaderService } from '../loader/loader.service';

import {select, Store} from '@ngrx/store';
import {WidgetPanel} from "../desktop/store/models/widgetpanel.model";
import {AuthStateInterface} from "../auth/store/models/auth.state.model";
import {FileState} from "../desktop/store/models/file.state.model";
import {selectAuth} from "../auth/store/selectors/auth.selector";



@Component({
	selector: 'app-progressbar',
	templateUrl: './system-loader.component.html',
	styleUrls: ['./system-loader.component.sass']
})
export class SystemLoaderComponent implements OnInit, OnDestroy, AfterViewInit {

	element: ElementRef;
	isProgressBar: boolean;
	interval: any;
	preloadingText = [
		'Scaning drives',
		'User detected',
		'Powering up',
		'User settings',
		'Building World',
		'Update verified',
		'Desktop online',
	];
	events: any[]| undefined;

	constructor(
		public loader: LoaderService,
		private el: ElementRef,
		//private store: Store<{ widgetPanel: WidgetPanel, auth: AuthStateInterface, file: FileState}>,
		private store: Store<{auth: AuthStateInterface}>
	) {
		this.element = el.nativeElement;
		this.isProgressBar = true;
		this.startTimer();
	}

	startTimer() {


		let index = 1;


		this.interval = setInterval(() => {

			let elm = document.getElementById('progress')
			let text = document.getElementById('preloading-text')
			if (!elm?.innerHTML.match(/100%/gi) && elm != null) {

				const value = parseInt(elm.innerHTML) + 1

				if (value % 15 == 0) {
					if (text != null) {
						index = index + 1;
						//console.log(index)
						text.innerHTML = this.preloadingText[index - 1];
						//console.log('interval')
					}
				}

				elm.innerHTML = value + '%';

			} else {

				this.isProgressBar = false;

				this.pauseTimer()
			}
		}, 15)
	}

	pauseTimer() {
		clearInterval(this.interval);
	}

	// Create getter methods to access events from the store

	ngAfterViewInit(): void {

		

	}

	ngOnInit(): void {


	}

	ngOnDestroy(): void {

	}
}

