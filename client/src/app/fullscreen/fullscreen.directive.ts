import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFullscreen]'
})
export class FullscreenDirective {

	fullScreen: boolean = false;

	constructor(elementRef: ElementRef) {
		//elementRef.nativeElement.style.backgroundColor = 'red'
	  }
}
