import { Terminal } from '../../terminal';

export class ShouldUserInfo{

	constructor(terminal: Terminal) {

		terminal.print(terminal._inputLine.textContent, 'white');
		terminal._inputLine.textContent = terminal.promptText;
		
		if(terminal.auth != null && terminal.auth['firstName']){
			terminal.print("first name: " + terminal.auth['firstName'], 'wheat');
			terminal.print("last name: " + terminal.auth['lastName'], 'wheat');
			terminal.print("email: " + terminal.auth['email'], 'wheat');
			terminal.print("roles: " + terminal.auth['roles'], 'wheat');
		}else{
			terminal.print("You are not logged in.", 'red');
		}
		
		terminal.scrollBottom();
	}
}