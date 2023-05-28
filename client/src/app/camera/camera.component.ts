import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-camera',
	templateUrl: './camera.component.html',
	styleUrls: ['./camera.component.sass']
})
export class CameraComponent implements OnInit, OnDestroy {
	@ViewChild('videoElement') videoElement: ElementRef | any;
	videoWidth = 0;
	videoHeight = 0;

	constructor() { }

	//TODO: Add a button to take a picture and save it locally
	//TODO: Add a button to start and stop the camera
	//TODO: Add a possibility to share the video stream with another user 
	
	/**
	 * @description Start the camera when loading the page
	 * @memberof CameraComponent
	 * @returns {void}
	 */
	ngOnInit(): void {
		this.startCamera();
	}

	/**
	 * @description Stop the camera when leaving the page
	 * @memberof CameraComponent
	 * @returns {void}
	 */
	ngOnDestroy(): void {
		this.videoElement.nativeElement.srcObject.getTracks()[0].stop();
	}

	/**
	 * @description Start the camera
	 * @memberof CameraComponent
	 * @returns {void}
	 */
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

	/**
	 * @description When the video is loaded, get the video width and height
	 * @param metadata: any
	 * @memberof CameraComponent
	 * @returns {void}
	 */
	onVideoLoaded(metadata: any) {
		this.videoWidth = metadata.target.videoWidth;
		this.videoHeight = metadata.target.videoHeight;
	}

}
