import { KeyStrategy } from './keyStrategie';
import { Terminal } from '../terminal';

//tokens
import { ShouldClearTerminal } from './keyTokens/shouldClearTerminal';
import { ShouldHelpInfo } from './keyTokens/shouldHelpInfo';

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
				console.log('ls');
				
				if(terminal.files != null){
					//print files
					//console.log(terminal.files);

					//generate string from names of files
					let filesString = "";
					terminal.files.forEach((file) => {
						filesString += file.name + "   ";
					});					
					
					terminal.print(terminal._inputLine.textContent, 'white');
					terminal._inputLine.textContent = terminal.promptText;
					terminal.print(filesString, 'deepskyblue');
				}

				terminal.scrollBottom();

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