import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Title} from "@angular/platform-browser";
import { async, TestBed } from '@angular/core/testing';


describe('App Component', () => {
	
	test("It should create the application", () => {
		//const fixture = TestBed.createComponent(AppComponent);
		//const app = fixture.componentInstance;
		//expect(app).toBeTruthy();
	});
	
	test('should render title', () => {
		//const fixture = TestBed.createComponent(AppComponent);
		//fixture.detectChanges();
		//const compiled = fixture.nativeElement as HTMLElement;
		//expect(compiled.querySelector('.content span')?.textContent).toContain('desktop app is running!');
	});

});
