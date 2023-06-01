import { Terminal } from '../../terminal';

export class ShouldHelpInfo{

	constructor(terminal: Terminal) {

		terminal.print(terminal._inputLine.textContent, 'white');
		terminal._inputLine.textContent = terminal.promptText;
		
		terminal.print('cat <filename> - read file', 'lightgreen');
		terminal.print('clear - clear terminal', 'lightgreen');
		terminal.print('cd <..> - change directory', 'lightgreen');
		terminal.print('help - help info', 'lightgreen');
		terminal.print('ls - list files', 'lightgreen');
		terminal.print('mkdir <dir> - make new directory', 'lightgreen');
		terminal.print('pwd - print working directory', 'lightgreen');
		terminal.print('rm <filename> - remove file', 'lightgreen');		
		terminal.print('rmdir - remove directory', 'lightgreen');
		terminal.print('touch - create file', 'lightgreen');
		terminal.print('whoami - print user info', 'lightgreen');
		
		terminal.scrollBottom();
	}
}