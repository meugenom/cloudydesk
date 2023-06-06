import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FileState } from '../desktop/store/models/file.state.model';
import { environment } from "src/environments/environment";
import { Store } from '@ngrx/store';
import { finalize, Subscription } from 'rxjs';
import { loadFiles } from '../desktop/store/actions/file.actions';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';


@Component({
	selector: 'app-uploading',
	templateUrl: './uploading.component.html',
	styleUrls: ['./uploading.component.sass']
})
export class UploadingComponent implements OnInit {


	//file uploading
	fileName = '';
	uploadProgress: number | undefined;
	uploadSub: Subscription | undefined;


	@Input() requiredFileType: string | undefined;


	constructor(
		private http: HttpClient,
		private store: Store<{ file: FileState }>,
		private fb: FormBuilder
	) {
		this.uploadProgress = 0;
	}

	//if click on the desktop then automatic close opened uploading component
	@HostListener("document:click", ["$event"])
	hide(event: Event) {

		//this.cancelUpload();
		//this.hideComponent();
	}

	ngOnInit(): void {
	}
	//file uploading
	onFileSelected(event: any) {
		//public onFileSelected(addForm: NgForm): void {

		//	const file: any = {
		//		userName: addForm.value.userName,
		//		password: addForm.value.password
		//	}

		//	console.log(addForm);

		const file: File = event.target.files[0];

		if (file) {

			this.fileName = file.name;
			const formData = new FormData();
			formData.append("file", file);
			console.log(formData);

			//TODO: get dirId from current folder
			const dirId = '2';

			const upload$ = this.http.post(`${environment.apiUrl}/api/v1/files/uploadFile?dirId=${dirId}`,
				formData, {
					reportProgress: true,
					observe: 'events'
				})
				.pipe(
					finalize(() => {
						this.reset()
						//get new file list for current user
						this.store.dispatch((loadFiles()))

						//get invisible for uploading component
						this.hideComponent();

					})
				);

			this.uploadSub = upload$.subscribe((event: any) => {
				if (event.type == HttpEventType.UploadProgress) {
					this.uploadProgress = 100 * (event.loaded / event.total);
					console.log("upload progress: " + this.uploadProgress)
				}
			})
		}
	}
	
	cancelUpload() {
		this.uploadSub?.unsubscribe();
		this.reset();		
		this.hideComponent();
		

	}

	reset() {
		this.uploadProgress = undefined;
		this.uploadSub = undefined;
	}

	hideComponent() {
		const uploadingContainer = document.getElementsByClassName("uploading-container")[0];
		uploadingContainer.classList.remove('uploading-container-visible')
		uploadingContainer.classList.add('uploading-container-invisible')
	}
}
