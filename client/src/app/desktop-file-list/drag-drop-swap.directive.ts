import {
	Directive,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	Output,
  } from '@angular/core';
  import { Globals } from '../global';
  
  @Directive({
	selector: '[appDragDropSwap]',
  })
  export class DragDropSwapDirective {
	constructor(
		public globals: Globals
	) {}
  
	@HostBinding('attr.draggable') draggable = true;
	@Input('elemPosition')
	elemPosition!: number;
	@Input('list') list: any;
	@Output('returnUpdatedList') returnUpdatedList = new EventEmitter<any>();
  
	//need to know 
	@HostListener('mousedown', ['$event'])
	onMouseDown(e: any) {
		
		//console.log('mouse down from drag element')
		
		//need stop this event but set selected for item
		//e.stopPropagation();
		//console.log(e.srcElement.attributes)
		/*
		if(e.srcElement.attributes != undefined){
			for (let index = 0; index < e.srcElement.attributes.length; index++) {
				const element = e.srcElement.attributes[index];				
				if(element.name == 'data-dataitem'){
					console.log(element.nodeValue)
					let item = document.getElementById(element.nodeValue);
					if(!item?.classList.contains('selected') && item!=null){
						item?.classList.add('selected')
						item.children[1].attributes[2].value = "background-color: #cdcdcd30; border-radius: 3px ; filter: drop-shadow(0 0 1px rgba(102, 102, 102, 1))"

					}else if(item != null){
						item?.classList.remove('selected')
						item.children[1].attributes[2].value = " drop-shadow(1px 1px 1px rgba(102, 102, 102, 0.5))"
					}

					//this.globals.selection?.hasOwnProperty('start');
					
				}
				
			}
		}*/
	}


	@HostListener('dragstart', ['$event'])
	onDragStart(e: any) {
		//e.preventDefault();
		//need add transit class
		//const id  = e.srcElement.id
		//let elem = document.getElementById(id)
		//elem?.classList.add('item-transit')

		//move parameter to cancel selection
		//elem?.setAttribute('dragstart','true');
		//console.log('dragStart')
		//console.log(this.elemPosition)
	  	e.dataTransfer.setData('text', this.elemPosition);
	}
  
	@HostListener('drop', ['$event'])
	onDrop(e : any) {
	  //e.preventDefault();
	  let sourceElementIndex = e.dataTransfer.getData('text');
	  let destElementIndex = this.elemPosition;
	  console.log('event Drop')
	  console.log('sourceElementIndex = '+ sourceElementIndex)
	  console.log('destElementIndex = '+ destElementIndex)
	  let clonedList = [...this.list];
	  //console.log(sourceElementIndex)
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
		//element?.classList.remove('item-transit')
		
		//set false to stop selection cancelation
		element?.setAttribute('dragstart','false');
	  }
	}
  
	@HostListener('dragover', ['$event'])
	onDragOver(e: any) {
	  //e.preventDefault();

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
  