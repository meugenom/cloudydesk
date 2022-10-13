import { TerminalComponent } from './terminal.component';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { By} from "@angular/platform-browser";

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('Terminal Component', () => {

	test("It should create the terminal component", () => {
		const fixture = TestBed.createComponent(TerminalComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	test("It should create div.#term element", () => {
		const fixture = TestBed.createComponent(TerminalComponent);
		fixture.componentInstance.ngAfterViewInit;
		expect(fixture.debugElement.query(By.css('#term'))).toBeTruthy();
	});





});
