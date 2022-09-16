import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-mobile',
	templateUrl: './mobile.component.html',
	styleUrls: ['./mobile.component.sass']
})
export class MobileComponent implements OnInit {

	constructor(
		private _router: Router
	) { }

	clientY: any = 0;
	scrollY: any = 0;

	ngOnInit(): void {
	}

	getDesktopView() {
		console.log("going to desktop version")
		this._router.navigate(['desktop-component'])
	}

	touchStart(ev: any) {
		// Use the event's data to call out to the appropriate gesture handlers
		switch (ev.touches.length) {
			case 1: this.handleOneTouch(ev); break;
			//case 2: handle_two_touches(ev); break;
			//case 3: handle_three_touches(ev); break;
			//default: gesture_not_supported(ev); break;
		}
	}

	touchEnd(ev: any) {
	}

	handleOneTouch(ev: any) {
		this.clientY = ev.changedTouches[0].clientY;
	}

	touchMove(e: any) {
		console.log('touch move')

		let updated = e.changedTouches[0].clientY;
		const maxHeight = document.getElementsByClassName("mobile-item-container")[0].scrollHeight;
		const clientHeight = document.getElementsByClassName("mobile-item-container")[0].clientHeight

		console.log(clientHeight);

		//base cases
		if (this.scrollY > maxHeight) this.scrollY = maxHeight;
		if (this.scrollY < 0) this.scrollY = 0;

		if (updated < this.clientY) {

			console.log("move down")
			//this.scrollY += 10;
			//window.scrollTo(0, this.scrollY)

		} else {

			console.log("move up")
			//this.scrollY -= 10;
			//window.scrollTo(0, this.scrollY)

		}

		this.clientY = updated;



	}

}
