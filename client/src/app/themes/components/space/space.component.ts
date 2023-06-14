import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-themes-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.sass']
})
export class SpaceComponent implements OnInit {

  selectedTheme: string = 'default';
  constructor() {
  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
  }

}
