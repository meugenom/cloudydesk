import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

export class AltKeyStrategy implements KeyStrategy {
	execute(terminal: Terminal, e: KeyboardEvent) {
		// Implement the logic for handling "Tab" key
		console.log('alt key');
		e.preventDefault();
	}
  }