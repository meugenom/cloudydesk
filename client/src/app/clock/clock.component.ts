import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";


@Component({
  selector: 'div[app-clock]',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.sass']
})

export class ClockComponent  implements OnInit, OnDestroy  {

  	rxTime = new Date();
  	intervalId: number | undefined;
  	subscription: Subscription | undefined;

	//TODO: Add a possibility to change the time format (12h or 24h)
	//TODO: Add a possibility to change the time zone
	//TODO: Integrate the settings of the clock to the settings of the app

	/**
	 * @description Start the clock when loading the page
	 * @memberof ClockComponent
	 * @returns {void}
	 */
	ngOnInit() {

		// Using RxJS Timer
		this.subscription = timer(0, 1000)
		  .pipe(
			map(() => new Date()),
			share()
		  )
		  .subscribe(time => {
			this.rxTime = time;
		  });
	  }
	  
	  /**
	   * @description Stop the clock when leaving the page
	   * @memberof ClockComponent
	   * @returns {void}
	   */
	  ngOnDestroy() {
		clearInterval(this.intervalId);
		if (this.subscription) {
		  this.subscription.unsubscribe();
		}
	  }
}
