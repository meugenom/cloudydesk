import {
	Directive,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	Output,
  } from '@angular/core';
  
  @Directive({
	selector: '[appDragDropSwap]',
  })
  export class DragDropSwapDirective {
	constructor() {}
  
	@HostBinding('attr.draggable') draggable = true;
	@Input('elemPosition')
	  elemPosition!: number;
	@Input('list') list: any;
	@Output('returnUpdatedList') returnUpdatedList = new EventEmitter<any>();
  
	@HostListener('dragstart', ['$event'])
	onDragStart(e: any) {

		//need add transit class
		const id  = e.srcElement.id
		let elem = document.getElementById(id)
		elem?.classList.add('item-transit')

		//move parameter to cancel selection
		elem?.setAttribute('dragstart','true');
		

	  	e.dataTransfer.setData('text', this.elemPosition);
	}
  
	@HostListener('drop', ['$event'])
	onDrop(e : any) {
	  e.preventDefault();
	  let sourceElementIndex = e.dataTransfer.getData('text');
	  let destElementIndex = this.elemPosition;
	  let clonedList = [...this.list];
	  if (sourceElementIndex !== destElementIndex) {
		clonedList.splice(destElementIndex, 1, this.list[sourceElementIndex]);
		clonedList.splice(sourceElementIndex, 1, this.list[destElementIndex]);
		this.returnUpdatedList.emit(clonedList);
	  }
	  //remove transit class
	  let elements = document.getElementsByClassName('item')
	  for (let index = 0; index < elements.length; index++) {
		const element = elements[index]
		//console.log(element)
		element?.classList.remove('item-transit')
		//set false to stop selection cancelation
		element?.setAttribute('dragstart','false');
	  }
	}
  
	@HostListener('dragover', ['$event'])
	onDragOver(e: any) {
	  e.preventDefault();

	  //const id  = e.srcElement.id
	  //let elem = document.getElementById(id)
	  //elem?.classList.add('item-unselectable')
	}

	//@HostListener('mousemove', ['$event'])
	//onMouseMove(e: MouseEvent) {
	//	console.log(e)
	//	
	//}
  }
  