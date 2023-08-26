import { Terminal } from './terminal';
import { KeyStrategy } from './keyStrategies/keyStrategie';
import { ArrowUpKeyStrategy } from './keyStrategies/arrowUpKeyStrategie';
import { ArrowDownKeyStrategy } from './keyStrategies/arrowDownKeyStrategie';
import { ArrowLeftKeyStrategy } from './keyStrategies/arrowLeftKeyStrategie';
import { ArrowRightKeyStrategy } from './keyStrategies/arrowRightKeyStrategie';
import { TabKeyStrategy } from './keyStrategies/tabKeyStrategie';
import { ShiftKeyStrategy } from './keyStrategies/shiftKeyStrategie';
import { MetaKeyStrategy } from './keyStrategies/metaKeyStrategie';
import { AltKeyStrategy } from './keyStrategies/altKeyStrategie';
import { ControlKeyStrategy } from './keyStrategies/controlKeyStrategie';
import { BackspaceKeyStrategy } from './keyStrategies/backspaceKeyStrategie';
import { EnterKeyStrategy } from './keyStrategies/enterKeyStrategie';

export class TerminalPrompt {

	VERSION: string;
	PROMPT_INPUT: number;
	PROMPT_PASSWORD: number;
	PROMPT_CONFIRM: number;
	firstPrompt: boolean;

	keyStrategies: Map<string, KeyStrategy> | any;
	
	//when key is pressed, we add it to this set
	keyStates: Set<string>;

	constructor(
	) {
		this.VERSION = "0.2.5";
		this.PROMPT_INPUT = 1;
		this.PROMPT_PASSWORD = 2;
		this.PROMPT_CONFIRM = 3;
		this.firstPrompt = true;
		

		//key strategies
		this.keyStrategies = new Map<string, KeyStrategy>();
		this.keyStrategies.set("ArrowUp", new ArrowUpKeyStrategy());
		this.keyStrategies.set("ArrowDown", new ArrowDownKeyStrategy());
		this.keyStrategies.set("ArrowLeft", new ArrowLeftKeyStrategy());
		this.keyStrategies.set("ArrowRight", new ArrowRightKeyStrategy());
		this.keyStrategies.set("Tab", new TabKeyStrategy());
		this.keyStrategies.set("Shift", new ShiftKeyStrategy());
		this.keyStrategies.set("Meta", new MetaKeyStrategy());
		this.keyStrategies.set("Alt", new AltKeyStrategy());
		this.keyStrategies.set("Control", new ControlKeyStrategy());
		this.keyStrategies.set("Backspace", new BackspaceKeyStrategy());
		this.keyStrategies.set("Enter", new EnterKeyStrategy());
		
		
		//add other key strategies here

		//when key is pressed, we add it to this set
		this.keyStates = new Set<string>();
	}	

	createInputField() {
		const inputField = document.createElement("input");
		Object.assign(inputField.style, {
			position: "absolute",
			zIndex: "-100",
			outline: "none",
			border: "none",
			opacity: "0",
			fontSize: "0.2em",
		});
		return inputField;
	}

	focusInputField(inputField: any) {
		inputField.focus();
	}


	//overided method from Prompt interface
	public promptInput(terminal: Terminal, message: string, type: number) {

		const inputField: any = this.createInputField();

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

		// This keypress is used to determine when the text has changed
		inputField.onkeyup = (e: any) => {
			const key = e.code || e.key;
			const strategy = this.keyStrategies.get(key);
			if (strategy) {
				strategy.execute(terminal, e);
			} else {
				//let show text if isn't Enter or Backspace
				terminal._inputLine.textContent = terminal._inputLine.textContent + e.key;

				if (terminal._inputLine.textContent.length > 60) {
					terminal.print(
						terminal._inputLine.textContent.substring(0, 60),
						'white'
					);

					let str = terminal._inputLine.textContent.substring(80, terminal._inputLine.textContent.length - 1);
					terminal._inputLine.textContent = str;
				}
			}
			this.keyStates.delete(key);
		};

		//focus input field
		this.focusInputField(inputField);
	}


}