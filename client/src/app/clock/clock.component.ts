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
  	intervalId: any | undefined;
  	subscription: Subscription | undefined;

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
	
	  ngOnDestroy() {
		clearInterval(this.intervalId);
		if (this.subscription) {
		  this.subscription.unsubscribe();
		}
	  }
}
