/**
 * This class is used to test the event queue
 */


import { EventQueue, EventData } from './event-queue';

/**
 * @description test cases for event queue
 * @param eventQueue, EventQueue
 */

describe('Event Queue', () => {
	
	let eventQueue: EventQueue;
	
	beforeEach(() => {
		eventQueue = new EventQueue();
	});
	
	test("It should create the application", () => {
		expect(eventQueue).toBeTruthy();
	});

	test("It should enqueue an event", () => {
		eventQueue.enqueue("test", new Date());
		expect(eventQueue.isEmpty()).toBe(false);
	});

	test("It should dequeue an event", () => {
		eventQueue.enqueue("test", new Date());
		eventQueue.dequeue();
		expect(eventQueue.isEmpty()).toBe(true);
	});

	test("It should check if queue is empty", () => {
		expect(eventQueue.isEmpty()).toBe(true);
	});

}
);
