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
