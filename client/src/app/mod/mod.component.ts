import {
	Component,
	Input,
	OnInit,
	Output,
	EventEmitter,
	OnDestroy,
  } from '@angular/core';
  
@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.sass']
})
export class ModComponent implements OnInit, OnDestroy {

  constructor() { }

  @Input() title: string = '';
  @Input() body: string = '';
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  ngOnInit(): void {
    console.log('Modal init');
  }

  closeMe() {
    this.closeMeEvent.emit();
  }
  confirm() {
    this.confirmEvent.emit();
  }
  ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }


}
