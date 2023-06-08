import { TerminalPrompt } from './terminal-prompt'

import { User } from '../auth/user/model/user';
import { File } from '../desktop/store/models/file.model';


export class Terminal extends TerminalPrompt{

	//decalre a variable to hold the terminal
	public html: any;
	public promptText: any;
	public innerWindow: any;
	public output: any;
	public promptPS: any;
	public _inputLine: any;
	public cursor: any;
	public _input: any;
	public shouldBlinkCursor: any;
	public cursorTimer: any;

	public auth: User| undefined;
	public files: File[]| undefined;

	

	//constructor
	constructor(
		containerId: string
		) {
		
		//inherit from TerminalPrompt class
		super();

		this.html = document.createElement("div");
    	this.html.className = "Terminal";
    	this.promptText = "";

    	this.innerWindow = document.createElement("div");
    	this.output = document.createElement("p");
    	this.promptPS = document.createElement("span");
    	this._inputLine = document.createElement("span"); //the span element where the users input is put
    	this.cursor = document.createElement("span");
    	this._input = document.createElement("p"); //the full element administering the user input, including cursor
    	this.shouldBlinkCursor = true;

		//append all our elements
		this._input.appendChild(this.promptPS);
		this._input.appendChild(this._inputLine);
		this._input.appendChild(this.cursor);
		this.innerWindow.appendChild(this.output);
		this.innerWindow.appendChild(this._input);
		this.html.appendChild(this.innerWindow);
		
		this.setBackgroundColor("black")
		this.setTextColor("white")
		this.setTextSize("0.9em")
		this.setWidth("100%")
		this.setHeight("100%");
		
		this.html.style.fontFamily = "courier-new, courier, monospace";
		this.html.style.margin = "0";
		this.html.style.overflow = "auto";
		this.html.style.whiteSpace = "pre";
		this.innerWindow.style.padding = "5px";
		this._input.style.margin = "0";
		this.output.style.margin = "0";
		this.cursor.style.background = "white";
		this.cursor.innerHTML = "_"; //put something in the cursor..
		this.cursor.style.display = "none"; //then hide it
		this._input.style.display = "none";

		if (typeof containerId === "string") {
			let container = document.getElementById(containerId);
			if (container != null) {
				container.innerHTML = "";
				container.appendChild(this.html);
			}
		} else {
			throw "terminal requires (string) parent container id in the constructor";
		}
	}

	/**
	 * @description:	Initializes the terminal
	 * @param inputField 
	 */
	public fireCursorInterval(inputField: any) {
		if (this.cursorTimer) {
			clearTimeout(this.cursorTimer);
		}

		this.cursorTimer = setTimeout(() => {
			if (inputField.parentElement && this.shouldBlinkCursor) {
				this.cursor.style.visibility =
					this.cursor.style.visibility === "visible"
						? "hidden"
						: "visible";
				this.fireCursorInterval(inputField);
			} else {
				this.cursor.style.visibility = "visible";
			}
		}, 400);
	};

	public scrollBottom() {
		this.html.scrollTop = this.html.scrollHeight;
	};

	public print(message: string, color: string) {
		//console.log('new stroke created '+ message);
		var newLine = document.createElement("div");
		newLine.textContent = message;
		newLine.style.color = color;
		this.output.appendChild(newLine);
		this.scrollBottom();
	};

	public input(message: string) {
		this.promptInput(this, message, this.PROMPT_INPUT);
	};

	public password(message: string) {
		this.promptInput(this, message, this.PROMPT_PASSWORD);
	};

	public confirm(message: string) {
		this.promptInput(this, message, this.PROMPT_CONFIRM);
	};

	public clear() {
		this.output.innerHTML = "";
	};

	public sleep(milliseconds: any) {
		setTimeout(milliseconds);
	};

	public setTextSize(size: string) {
		this.output.style.fontSize = size;
		this._input.style.fontSize = size;
	};

	public setTextColor(color: string) {
		this.html.style.color = color;
		this.cursor.style.background = color;
	};

	public setBackgroundColor(color: string) {
		this.html.style.background = color;
	};

	public setWidth(width: string) {
		this.html.style.width = width;
	};

	public setHeight(height: string) {
		this.html.style.height = height;
	};

	public blinkingCursor(bool: string) {
		bool = bool.toString().toUpperCase();
		this.shouldBlinkCursor =
			bool === "TRUE" || bool === "1" || bool === "YES";
	};

	public setPrompt(promptPS: string) {
		this.promptPS.textContent = promptPS;
	};

	public getVersion() {
		console.info(`neetcloud.dev-terminal ${this.VERSION}`);
		return this.VERSION;
	};

}