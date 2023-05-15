import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-camera',
	templateUrl: './camera.component.html',
	styleUrls: ['./camera.component.sass']
})
export class CameraComponent implements OnInit {

	@ViewChild('videoElement') videoElement: ElementRef | any;
	videoWidth = 0;
	videoHeight = 0;

	constructor() { }

	ngOnInit(): void {
		this.startCamera();
	}

	ngOnDestroy(): void {
		this.videoElement.nativeElement.srcObject.getTracks()[0].stop();
	}

	startCamera() {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true })
				.then(stream => {
					this.videoElement.nativeElement.srcObject = stream;
					this.videoElement.nativeElement.play();
				})
				.catch(error => console.error('Error accessing camera: ', error));
		}
	}

	onVideoLoaded(metadata: any) {
		this.videoWidth = metadata.target.videoWidth;
		this.videoHeight = metadata.target.videoHeight;
	}

}
