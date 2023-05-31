import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { CameraComponent } from './camera.component';

describe('CameraComponent', () => {
  let component: CameraComponent;
  let fixture: ComponentFixture<CameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CameraComponent],
      providers: [
        // other services that you need to test
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const mockVideoElement: any = {
      nativeElement: {
        srcObject: {
          getTracks: () => [{ stop: jest.fn() }]
        },
        play: jest.fn()
      }
    };

    component.videoElement = new ElementRef(mockVideoElement);
    
    fixture.detectChanges();
  });

  afterEach(() => {
    component.videoElement.nativeElement.srcObject.getTracks()[0].stop();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set video width and height onVideoLoaded', () => {
    const metadata = {
      target: {
        videoWidth: 640,
        videoHeight: 480
      }
    };
    component.onVideoLoaded(metadata);
    expect(component.videoWidth).toBe(640);
    expect(component.videoHeight).toBe(480);
  });

  // other tests

});
