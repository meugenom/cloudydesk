import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { LoaderService } from '../loader/loader.service';

import { select, Store } from '@ngrx/store';
import { WidgetPanel } from "../desktop/store/models/widgetpanel.model";
import { AuthStateInterface } from "../auth/store/models/auth.state.model";
import { FileState } from "../desktop/store/models/file.state.model";
import { distinctUntilChanged, Subscription } from 'rxjs';

// event queue.ts
import { EventQueue, EventData } from './event-queue'; // Import the EventQueue implementation
import { animate, style, transition, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
	style({
	  opacity: 0
	}),
	animate('1s ease-in', style({
	  opacity: 1
	}))
  ]);
  
  const leaveTrans = transition(':leave', [
	style({
	  opacity: 1
	}),
	animate('1s ease-out', style({
	  opacity: 0
	}))
  ])
  
  const fadeIn = trigger('fadeIn', [
	enterTransition
  ]);
  
  const fadeOut = trigger('fadeOut', [
	leaveTrans
  ]);

@Component({
	selector: 'app-progressbar',
	templateUrl: './system-loader.component.html',
	styleUrls: ['./system-loader.component.sass'],
	animations: [
		fadeIn,
		fadeOut
	  ]
})
export class SystemLoaderComponent implements OnInit, OnDestroy, AfterViewInit {

	element: ElementRef;
	isProgressBar: boolean;
	interval: any;

	private subscription: Subscription;

	//for queue
	queue: EventQueue;
	currentEvent:  any = { date: '', adapter: '', message: '', isError: false };

	constructor(
		public loader: LoaderService,
		private el: ElementRef,
		private store: Store<{ widgetPanel: WidgetPanel, auth: AuthStateInterface, files: FileState }>
	) {

		this.queue = new EventQueue(); // Instantiate the queue

		this.element = el.nativeElement;
		this.isProgressBar = true;


		this.subscription = this.store
			.pipe(
				select(state => state.auth)
			)
			.subscribe(authAction => {
				console.log(authAction.lastActionDate.toLocaleString('en-GB', { timeZone: 'UTC' }) + ' : ' + authAction.lastAction);
				this.queue.enqueue(
					authAction.lastAction,
					authAction.lastActionDate
				);
				if (!this.interval) {										
					this.startTimer();
					this.isProgressBar = true;
				}
			});

		this.subscription.add(
			this.store
				.pipe(
					select(state => state.widgetPanel),
					distinctUntilChanged()
				)
				.subscribe(widgetPanel => {
					console.log(widgetPanel.lastActionDate.toLocaleString('en-GB', { timeZone: 'UTC' }) + ' : ' + widgetPanel.lastAction);
					this.queue.enqueue(
						widgetPanel.lastAction,
						widgetPanel.lastActionDate
					);
					if (!this.interval) {
						this.startTimer();
						this.isProgressBar = true;
					}

				}))

	}

	startTimer() {


		let index = 1;

		this.interval = setInterval(() => {

			console.log('INTERVAL STARTED')

			let elm = document.getElementById('progress')
			if (!elm?.innerHTML.match(/100%/gi)
				&& elm != null) {

				const value = parseInt(elm.innerHTML) + 1

				if (value % 10 == 0) {
					if (!this.queue.isEmpty()) {

						index = index + 1;
						console.log(index)

						if (!this.queue.isEmpty() && this.interval) {
							
							let event: any = this.queue.dequeue();
							let tokens = this.getTokens(event.event);
							console.log(tokens);
							this.currentEvent = 
							{ date: 	event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
							, adapter: 	tokens.adapter
							, message: 	tokens.message
							, isError: 	tokens.isError 
							};
							
						}
					}
				}

				elm.innerHTML = value + '%';

			} else {

				this.isProgressBar = false;
				this.pauseTimer()
				this.currentEvent = { date: '', adapter: '', message: '', isError: false };
				
			}
		}, 80) //multiply by 10 = 0,8s
	}

	pauseTimer() {
		clearInterval(this.interval);
		this.interval = null;
	}

	ngAfterViewInit(): void { }

	ngOnInit(): void { }

	ngOnDestroy(): void {

		// Unsubscribe to prevent memory leaks
		this.subscription.unsubscribe();
		this.pauseTimer();
	}

	//static function to devide string txt to parts adapter, message, isError
	getTokens(txt: string) {
		//match in the string all the words between '[]'
		let adapter = txt.split(/(?<=\[)(.*?)(?=\])/g)[1];
		//match i the string all the words after '[]'
		let message = txt.split(/(?<=\[)(.*?)(?=\])/g)[2].replace(']','');
		//match in the message word Failed
		let isError = message.match(/Failed/gi) ? true : false;
		return { adapter: adapter , message: message, isError: isError};
	}
}

