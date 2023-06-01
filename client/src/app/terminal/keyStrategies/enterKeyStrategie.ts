import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

//tokens
import { ShouldClearTerminal } from './keyTokens/shouldClearTerminal';
import { ShouldHelpInfo } from './keyTokens/shouldHelpInfo';

export class EnterKeyStrategy extends KeyStrategy {

	execute(terminal: Terminal, e: KeyboardEvent) {
		// Implement the logic for handling "Enter" key
		console.log('enter key');
		e.preventDefault();

		const textContent = terminal._inputLine.textContent.trim(); //removes whitespaces from the end		
		//console.log(textContent.split(">")[1]);
		const commandText = textContent.split(">")[1].trim(); //removes whitespaces from the start and end of the string

		// clear terminal
		if ( commandText == 'clear') {
			
			//clear terminal
			console.log('clear');
			new ShouldClearTerminal().exec(terminal);
		
		// help about commands
		} else if (commandText == 'help') {
			//print help info
			new ShouldHelpInfo(terminal);
		
		//without commands (empty)
		} else {
			//enter on new line
			terminal.print(terminal._inputLine.textContent);
			terminal._inputLine.textContent = terminal.promptText;
			terminal.scrollBottom();
		}
	}
}