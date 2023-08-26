import { Directive, HostListener, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadFiles } from 'src/app/desktop/store/actions/file.actions';
import { ContextState } from 'src/app/desktop/store/models/context.state.model';
import { FileState } from 'src/app/desktop/store/models/file.state.model';
import { DirService } from 'src/app/services/dir.service';
import { FileService } from '../../../services/file.service';

@Directive({
	selector: 'li[DeleteItem]'
})
export class DeleteItemDirective {

	usedFolder: string = '';
	newFolder: string = '';

	constructor(
		private store: Store<{ file: FileState, context: ContextState }>,
		private dirService: DirService,
		private filesService: FileService
	) {

	}

	@HostListener('click', ['$event'])
	onClick($event: any) {
        
		console.log("DeleteItemDirective");				
		console.log($event);
		console.log($event.target);

		const target = event?.target as HTMLElement;		
		if (target.classList.contains("context-menu-item")) {
			
		
		//get the current folder from the store
		this.store.select('context').pipe(take(1)).subscribe		
		   ((context:any) => {
            if(	context.folderSpaceId ==''){
				
				if(context.isItemDirectory){
					// this is a some directory to delete

					const dirData = {
						id: context.itemId
					}
					
					this.dirService.deleteDir(dirData).subscribe((res:any) => {
						console.log(res);
						//get new file list for current user
						this.store.dispatch((loadFiles()))
					}
					);

				}else{
					
					// this is a file to delete
					const fileData = {
						id: context.itemId
					}
					
					this.filesService.deleteFile(fileData).subscribe((res:any) => {
						console.log(res);
						//get new file list for current user
						this.store.dispatch((loadFiles()))
					});
				}
				
				
			};
		});
		
		}			
	
	}
}
