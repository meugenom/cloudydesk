import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetPanelComponent } from './widget-panel.component';

describe('WidgetPanelComponent', () => {
  let component: WidgetPanelComponent;
  let fixture: ComponentFixture<WidgetPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
