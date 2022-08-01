import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponentComponent } from './taskbar.component';

describe('TaskComponentComponent', () => {
  let component: TaskComponentComponent;
  let fixture: ComponentFixture<TaskComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
