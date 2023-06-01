import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

export class MetaKeyStrategy extends KeyStrategy {
	execute(terminal: Terminal, e: KeyboardEvent) {
	  // Implement the logic for handling "ArrowUp" key
	  console.log('meta key');
	  e.preventDefault();
	}
  }
  