import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

export class ControlKeyStrategy extends KeyStrategy {
	execute(terminal: Terminal, e: KeyboardEvent) {
		// Implement the logic for handling "Tab" key
		console.log('control key');
		e.preventDefault();
	}
  }