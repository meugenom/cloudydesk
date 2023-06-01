import { Terminal } from '../../terminal';

export class ShouldListFiles {

	constructor(terminal: Terminal) {

		terminal.print(terminal._inputLine.textContent, 'white');
		terminal._inputLine.textContent = terminal.promptText;

		if (terminal.files != null) {
			//console.log(terminal.files);

			//generate string from names of files
			let filesString = "";
			terminal.files.forEach((file) => {
				filesString += file.name + "/n";
			});

			terminal.print(filesString, 'deepskyblue');
		} else {
			terminal.print("Error: No files found", 'red');
		}

		terminal.scrollBottom();
	}
}