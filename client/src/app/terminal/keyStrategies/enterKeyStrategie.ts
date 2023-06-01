import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

export class EnterKeyStrategy extends KeyStrategy {
	execute(terminal: Terminal, e: KeyboardEvent) {
		// Implement the logic for handling "Enter" key
		console.log('enter key');
		e.preventDefault();

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
		//
	}
}