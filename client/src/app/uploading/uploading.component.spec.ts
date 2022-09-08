import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingComponent } from './uploading.component';

describe('UploadingComponent', () => {
  let component: UploadingComponent;
  let fixture: ComponentFixture<UploadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
