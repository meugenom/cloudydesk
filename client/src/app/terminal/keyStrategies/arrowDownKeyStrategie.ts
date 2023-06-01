import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

export class ArrowDownKeyStrategy extends KeyStrategy {
	execute(terminal: Terminal, e: KeyboardEvent) {
	  // Implement the logic for handling "ArrowUp" key
	  console.log('arrow down key');
	  e.preventDefault();
	}
  }
  