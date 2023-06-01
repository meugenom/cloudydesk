import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

export class BackspaceKeyStrategy extends KeyStrategy {
	execute(terminal: Terminal, e: KeyboardEvent) {
		// Implement the logic for handling "Backspace" key
		console.log('backspace key');
		if (terminal._inputLine.textContent != terminal.promptText) {
			const length = terminal._inputLine.textContent.length;
			terminal._inputLine.textContent =
				terminal._inputLine.textContent.substring(0, length - 1);
		}
		e.preventDefault();
	}
  }