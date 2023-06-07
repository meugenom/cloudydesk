import { Component, OnInit } from '@angular/core';
import { ModService } from './mod/mod.service';
import { Store } from '@ngrx/store';
import { Navigator } from './desktop/store/models/navigator.model';
import { AddDimensions } from './desktop/store/actions/navigator.action';
import { Router } from '@angular/router';
import { LoaderService } from './loader/loader.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	providers: [ModService]
})
export class AppComponent implements OnInit {

	constructor(
		private _store: Store<{ navigator: Navigator }>,
		private _router: Router,
		private _loaderService: LoaderService
	) {

		_store.select('navigator').subscribe(data => {
			console.log(data);
		})

	}

	ngOnInit(): void {

		console.log(navigator.userAgent)
		console.log(window.innerHeight)
		console.log(window.innerWidth)
		console.log(navigator.userAgent)

		//need choose mobile or desktop component
		//this._router.navigate(['mobile-component'])
		this._router.navigate(['desktop-component'])

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

		this._store.dispatch(
			AddDimensions(
				navi))
	}

	getLoading() {
		return this._loaderService.getLoading();
	}
	
}
