import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

//tokens
import { ShouldClearTerminal } from './keyTokens/shouldClearTerminal';
import { ShouldHelpInfo } from './keyTokens/shouldHelpInfo';
import { ShouldListFiles } from './keyTokens/shouldListFiles';
import { ShouldUserInfo } from './keyTokens/shouldUserInfo';
import { ShouldSystemInfo } from './keyTokens/shouldSystemInfo';

export class EnterKeyStrategy implements KeyStrategy {


	execute(terminal: Terminal, e: KeyboardEvent) {
		// Implement the logic for handling "Enter" key
		console.log('enter key');
		e.preventDefault();

		const textContent = terminal._inputLine.textContent.trim(); //removes whitespaces from the end		
		//console.log(textContent.split(">")[1]);
		const commandText = textContent.split(">")[1].trim(); //removes whitespaces from the start and end of the string

		switch (commandText) {
			case 'clear' :
				//clear terminal
				console.log('clear');
				new ShouldClearTerminal().exec(terminal);
				break;
			case 'help':
				//print help info
				new ShouldHelpInfo(terminal);
				break;
			case 'ls':
				//list files
				new ShouldListFiles(terminal);
				break;
			case 'whoami':
				//print user info
				new ShouldUserInfo(terminal);
				break
			case 'uname':

				//print system info
				new ShouldSystemInfo(terminal);
				
				break;
			case '':
				terminal.print(terminal._inputLine.textContent, 'white');
				terminal._inputLine.textContent = terminal.promptText;
				terminal.scrollBottom();	
				break;
			default:
				terminal.print(terminal._inputLine.textContent, 'white');
				terminal._inputLine.textContent = terminal.promptText;
				terminal.print("Error: Command not found: ", 'red');
				terminal.scrollBottom();
				break;
		}


	}
}