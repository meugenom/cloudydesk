import { Terminal } from '../../terminal';

export class ShouldHelpInfo{

	constructor(terminal: Terminal) {		
		
		terminal.print('cat <read file>');
		terminal.print('clear <clear terminal>');
		terminal.print('cd <change directory>');
		terminal.print('help <help info>');
		terminal.print('ls <list files>');
		terminal.print('mkdir <make directory>');
		terminal.print('pwd <print working directory>');
		terminal.print('rm <remove file>');		
		terminal.print('rmdir <remove directory>');
		terminal.print('touch <create file>');
		
		terminal._inputLine.textContent = terminal.promptText;
		terminal.scrollBottom();
	}
}