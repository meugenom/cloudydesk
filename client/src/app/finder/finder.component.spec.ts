import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderComponent } from './finder.component';

describe('ExplorerComponent', () => {
  let component: FinderComponent;
  let fixture: ComponentFixture<FinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
