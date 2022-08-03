import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawComponent } from './draw.component';

describe('DrawComponent', () => {
  let component: DrawComponent;
  let fixture: ComponentFixture<DrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
