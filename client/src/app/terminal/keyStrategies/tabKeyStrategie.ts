import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

export class TabKeyStrategy extends KeyStrategy {
	execute(terminal: Terminal, e: KeyboardEvent) {
		e.preventDefault();
		//add 2 space
		terminal._inputLine.textContent +=  `   `;
		
	}
  }