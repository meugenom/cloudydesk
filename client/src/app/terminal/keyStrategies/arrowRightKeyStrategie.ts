import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

export class ArrowRightKeyStrategy implements KeyStrategy {
	execute(terminal: Terminal, e: KeyboardEvent) {
	  // Implement the logic for handling "ArrowUp" key
	  console.log('arrow right key');
	  e.preventDefault();
	}
  }
  