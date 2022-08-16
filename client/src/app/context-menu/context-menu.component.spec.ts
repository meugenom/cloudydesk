import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverMenuComponent } from './context-menu.component';

describe('PopoverMenuComponent', () => {
  let component: PopoverMenuComponent;
  let fixture: ComponentFixture<PopoverMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopoverMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopoverMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
