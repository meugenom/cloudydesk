import { Terminal } from '../../terminal';

export class ShouldSystemInfo {

	constructor(terminal: Terminal) {

		terminal.print(terminal._inputLine.textContent, 'white');
		terminal._inputLine.textContent = terminal.promptText;

		terminal.print("OS: " + navigator.platform, 'gold');
		terminal.print("Browser: " + navigator.appCodeName, 'gold');
		terminal.print("Browser version: " + navigator.appVersion, 'gold');
		terminal.print("Cookies enabled: " + navigator.cookieEnabled, 'gold');
		terminal.print("Browser language: " + navigator.language, 'gold');
		terminal.print("Browser online: " + navigator.onLine, 'gold');

		terminal.scrollBottom();
	}
}