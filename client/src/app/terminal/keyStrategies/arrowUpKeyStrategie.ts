import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

export class ArrowUpKeyStrategy implements KeyStrategy {
	execute(terminal: Terminal, e: KeyboardEvent) {
	  // Implement the logic for handling "ArrowUp" key
	  console.log('arrow up key');
	  e.preventDefault();
	}
  }
  