import { Component, OnInit } from '@angular/core';
import { ModService } from './mod/mod.service';
import { Store } from '@ngrx/store';
import { Navigator } from './desktop/store/models/navigator.model';
import { AddDimensions } from './desktop/store/actions/navigator.action';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	providers: [ModService]
})
export class AppComponent implements OnInit {

	constructor(
		private store: Store<{ navigator: Navigator }>
	) {

		store.select('navigator').subscribe(data => {
			console.log(data);
		})

	}

	ngOnInit(): void {

		console.log(navigator.userAgent)
		console.log(window.innerHeight)
		console.log(window.innerWidth)
		console.log(navigator.userAgent)

		this.addDevice(window.innerHeight, window.innerWidth, false, navigator.userAgent)

	}


	addDevice(width: any, height: any, isMobile: any,
		browser: any
	) {

		const navi: Navigator = {
			width: width,
			height: height,
			isMobile: isMobile,
			browser: browser
		}

		this.store.dispatch(
			AddDimensions(
				navi))
	}


	
}
