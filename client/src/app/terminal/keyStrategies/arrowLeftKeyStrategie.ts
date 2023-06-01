import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

export class ArrowLeftKeyStrategy implements KeyStrategy {
	execute(terminal: Terminal, e: KeyboardEvent) {
	  // Implement the logic for handling "ArrowUp" key
	  console.log('arrow left key');
	  e.preventDefault();
	}
  }
  