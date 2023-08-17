import { Directive, HostListener, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadFiles } from 'src/app/desktop/store/actions/file.actions';
import { ContextState } from 'src/app/desktop/store/models/context.state.model';
import { FileState } from 'src/app/desktop/store/models/file.state.model';
import { DirService } from 'src/app/services/dir.service';

@Directive({
	selector: 'li[AddNewFolder]'
})
export class AddNewFolderDirective {

	usedFolder: string = '';
	newFolder: string = 'New Folder';

	constructor(
		private store: Store<{ file: FileState, context: ContextState }>,
		private dirService: DirService
	) {

	}


	@HostListener('click', ['$event'])
	onClick($event: any) {		
        
		console.log("AddNewFolderDirective");				
		console.log($event);
		console.log($event.target);

		const target = event?.target as HTMLElement;		
		if (target.classList.contains("context-menu-item")) {


		//get the current folder from the store
		this.store.select('context').pipe(take(1)).subscribe		
		   ((context:any) => {
			if(context.usedFolder != null || context.usedFolder != ''){
				this.usedFolder = context.usedFolder;
				const dirData = {
					dirName: this.newFolder,
					parentId: this.usedFolder
				}
				this.dirService.createDir(dirData).subscribe((res:any) => {
					console.log(res);
					//get new file list for current user
					this.store.dispatch((loadFiles()))
				}
				);
			};
		});
		}			
	}

	open() {


	}

	close() {

	}

}
