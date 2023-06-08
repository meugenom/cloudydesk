import { Terminal } from '../../terminal';

export class ShouldClearTerminal{

	public exec (terminal: Terminal) {		

		//if we have not something to remove
		if (document.getElementsByClassName('Terminal')[0].childNodes.length == 2) {
		
			//console.log(document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes[0])
			let length = document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes.length;
			while (length > 0) {
				document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes[0].remove();
				length = document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes.length;
			}
		}

		terminal._inputLine.textContent = terminal.promptText;
		terminal.scrollBottom();
	}
}