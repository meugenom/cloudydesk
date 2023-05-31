import { Terminal } from './terminal';

export class TerminalPrompt {

	VERSION: string;
	PROMPT_INPUT: number;
	PROMPT_PASSWORD: number;
	PROMPT_CONFIRM: number;
	firstPrompt: boolean;

	constructor() {
		this.VERSION = "0.0.1";
		this.PROMPT_INPUT = 1;
		this.PROMPT_PASSWORD = 2;
		this.PROMPT_CONFIRM = 3;
		this.firstPrompt = true;
	}

	//overided method from Prompt interface
	public promptInput(terminal: Terminal, message: string, type: number) {

		const inputField: any = document.createElement("INPUT");
		inputField.style.position = "absolute";
		inputField.style.zIndex = "-100";
		inputField.style.outline = "none";
		inputField.style.border = "none";
		inputField.style.opacity = "0";
		inputField.style.fontSize = "0.2em";

		terminal._inputLine.textContent = "";
		terminal._input.style.display = "block";
		terminal.html.appendChild(inputField);
		terminal.fireCursorInterval(inputField);

		inputField.onblur = function () {
			terminal.cursor.style.display = "none";
		};

		inputField.onfocus = function () {
			inputField.value = terminal._inputLine.textContent;
			terminal.cursor.style.display = "inline";
		};

		terminal.html.onclick = function () {
			inputField.focus();
		};

		//old keypress
		inputField.onkeydown = function (e: any) {
			if (
				e.code === "ArrowUp" ||
				e.code === "ArrowRight" ||
				e.code === "ArrowLeft" ||
				e.code === "ArrowDown" ||
				e.code === "Tab" ||
				e.key == "Shift" ||
				e.key == "Meta" ||
				e.key == "Alt" ||
				e.key == "Control"
			) {
				e.preventDefault();
			} else if (e.key == "Backspace") {
				if (terminal._inputLine.textContent != terminal.promptText) {
					const length = terminal._inputLine.textContent.length;
					terminal._inputLine.textContent =
						terminal._inputLine.textContent.substring(0, length - 1);
				}
			}
			//console.log(e.key)
		};

		inputField.onkeyup = function (e: any) {
			//console.log(e.key)


			if (e.key == "Enter") {

				//COMMAND 'clear'
				if (terminal._inputLine.textContent == terminal.promptText + 'clear') {

					//if we have not something to remove
					if (document.getElementsByClassName('Terminal')[0].childNodes.length == 2) {
						//console.log(document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes[0])
						let length = document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes.length;
						while (length > 0) {
							document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes[0].remove();
							length = document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes.length;
						}
					}

					terminal._inputLine.textContent = terminal.promptText;
					terminal.scrollBottom();

				} else {

					terminal.print(terminal._inputLine.textContent);
					terminal._inputLine.textContent = terminal.promptText;
					terminal.scrollBottom();
				}

			} else if (
				e.key == "ArrowRight" ||
				e.key == "ArrowLeft" ||
				e.key == "ArrowUp" ||
				e.key == "ArrowDown" ||
				e.key == "Shift" ||
				e.key == "Meta" ||
				e.key == "Alt" ||
				e.key == "Control"
			) {
				//nothing

			} else if (e.key == "Tab") {
				//add 2 space
				terminal._inputLine.textContent =
					terminal._inputLine.textContent + `   `;

			} else if (e.key == "Backspace") {
				if (terminal._inputLine.textContent != terminal.promptText) {
					const length = terminal._inputLine.textContent.length;
					terminal._inputLine.textContent = terminal._inputLine.textContent.substring(0, length - 1);
				}
			} else {
				//other commands

				//let show text if isn't Enter or Backspace
				terminal._inputLine.textContent = terminal._inputLine.textContent + e.key;

				if (terminal._inputLine.textContent.length > 60) {
					terminal.print(
						terminal._inputLine.textContent.substring(0, 60)
					);

					let str = terminal._inputLine.textContent.substring(80, terminal._inputLine.textContent.length - 1);
					terminal._inputLine.textContent = str;
				}

			}
		};

		inputField.focus();
	}


}