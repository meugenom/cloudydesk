import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { LoaderService } from '../loader/loader.service';


@Component({
	selector: 'app-progressbar',
	templateUrl: './progressbar.component.html',
	styleUrls: ['./progressbar.component.sass']
})
export class ProgressbarComponent implements OnInit, OnDestroy, AfterViewInit {

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
	]

	constructor(
		public loader: LoaderService,
		private el: ElementRef
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


	ngAfterViewInit(): void {
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {

	}
}
