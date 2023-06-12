import { AfterViewInit, Component, ElementRef, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { Terminal } from './terminal';
//import * as Terminal from './terminal-core'; //this is not working //old code for js terminal

import { Store } from '@ngrx/store';
import { AuthStateInterface } from '../auth/store/models/auth.state.model';
import { FileState } from '../desktop/store/models/file.state.model';

import { User } from '../user/models/user';
import { File } from '../desktop/store/models/file.model';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'app-terminal',
	templateUrl: './terminal.component.html',
	styleUrls: ['./terminal.component.sass']
})
export class TerminalComponent implements OnInit, AfterViewInit {

	private email: String;
	private user: User| undefined;
	private files: File[]| undefined;
	private term: Terminal| undefined;

	constructor(
		private element: ElementRef,
		//private userStore: Store<AuthStateInterface>,
		private userStore: Store<{ auth: AuthStateInterface}>,
		private fileStore: Store<FileState>
	) {
		this.email = "";
	}

	ngOnInit(): void {
	}

	ngAfterViewInit() {

		// get email and user information
		this.userStore.select('auth').subscribe((data) => {
			//console.log(data)
			//add email to the template
			this.email = data['user']['email']
			this.user = data['user']

			//add new user to the terminal
			this.putUser(this.user);

		})

		// get files
		this.fileStore.select('files').subscribe((data: any) => {
			
			//console.log(data.files)
			
			//add list of files to the template
			this.files = data.files

			//add new files to the terminal
			this.putFiles(this.files);

		})

		// create terminal
		this.term = new Terminal('term');
		this.term.promptText = "/" + (this.email.length == 0 ? "user" : this.email) + "> ";
		this.term.setTextColor("white");
		this.term.cursor.style.background = "white";
		this.term.input(``);
		this.term._inputLine.textContent = this.term.promptText;
		this.term.print(
			`(c) neetcloud.dev v.` + this.term.getVersion() + `, type 'help'`, 
			'plum');
		this.term.scrollBottom();
		
		//first time we need to add user and files
		if(this.user != null){
			//console.log('add auth and files')
			this.term.auth = this.user;
		}
		
		if(this.files != null){
			this.term.files = this.files;
		}
	}

	putFiles(files : any){
		if(this.term != undefined){
			if(files){
				this.term.files = files;
			}else{
				this.term.files = undefined;
			}
			
		}

		return this.term;
	};

	putUser(user : any){
		if(this.term != undefined){			
			if(user.email.length > 0){
				this.term.auth = user;
				this.term.promptText = "/" + user['email'] + "> ";
				this.term._inputLine.textContent = this.term.promptText;
				this.term.scrollBottom();
			} else {
				this.term.auth = undefined;
				this.term.promptText = "/" + 'user' + "> ";
				this.term._inputLine.textContent = this.term.promptText;
				this.term.scrollBottom();
			}
		}
	}



}
