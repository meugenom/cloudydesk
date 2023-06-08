import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

export class ShiftKeyStrategy implements KeyStrategy {
	execute(terminal: Terminal, e: KeyboardEvent) {
	  // Implement the logic for handling "ArrowUp" key
	  console.log('shift key');
	  e.preventDefault();
	}
  }
  