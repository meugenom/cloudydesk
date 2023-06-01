/**
 * Event Queue class for the system loader module to handle events in the system loader module
 * uses FIFO (First In First Out) method to handle events
 * @class EventQueue 
 * 
 */

export interface EventData {
	event: string;
	date: Date;
}

export class EventQueue {
	
	private queue: EventData[]|any;
	
	constructor() { 
		this.queue = [];
	};

	public enqueue(event: string, date: Date) {
		this.queue.unshift({ event, date });
	}

	public dequeue() {
		//console.log(this.queue)
		return this.queue.pop();
	}

	public isEmpty() {
		return this.queue.length === 0;
	}
}
