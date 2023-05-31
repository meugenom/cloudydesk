module.exports = (function () {
  var VERSION = "0.0.1";

  // prompt types
  var PROMPT_INPUT = 1,
    PROMPT_PASSWORD = 2,
    PROMPT_CONFIRM = 3;

  var firstPrompt = true;

  var promptInput = function (terminalObj, message, PROMPT_TYPE) {
    var shouldDisplayInput =
      PROMPT_TYPE === PROMPT_INPUT || PROMPT_TYPE === PROMPT_CONFIRM;
    var inputField = document.createElement("input");

    inputField.style.position = "absolute";
    inputField.style.zIndex = "-100";
    inputField.style.outline = "none";
    inputField.style.border = "none";
    inputField.style.opacity = "0";
    inputField.style.fontSize = "0.2em";

    terminalObj._inputLine.textContent = "";
    terminalObj._input.style.display = "block";
    terminalObj.html.appendChild(inputField);
    terminalObj.fireCursorInterval(inputField);

    inputField.onblur = function () {
      terminalObj._cursor.style.display = "none";
    };

    inputField.onfocus = function () {
      inputField.value = terminalObj._inputLine.textContent;
      terminalObj._cursor.style.display = "inline";
    };

    terminalObj.html.onclick = function () {
      inputField.focus();
    };

    //old keypress
    inputField.onkeydown = function (e) {
      if (
        e.code === "ArrowUp" ||
        e.code === "ArrowRight" ||
        e.code === "ArrowLeft" ||
        e.code === "ArrowDown" ||
        e.code === "Tab" ||
		e.key == "Shift"||
		e.key == "Meta" ||
		e.key == "Alt" ||
		e.key == "Control"
      ) {
        e.preventDefault();
      } else if (e.key == "Backspace") {
        if (terminalObj._inputLine.textContent != terminalObj.promptText) {
          const length = terminalObj._inputLine.textContent.length;
          terminalObj._inputLine.textContent =
            terminalObj._inputLine.textContent.substring(0, length - 1);
        }
      }

      //console.log(e.key)
    };

    inputField.onkeyup = function (e) {
      //console.log(e.key)


      if (e.key == "Enter") {

		//COMMAND 'clear'
		if (terminalObj._inputLine.textContent == terminalObj.promptText + 'clear') {

			//if we have not something to remove
			if(document.getElementsByClassName('Terminal')[0].childNodes.length == 2){
				//console.log(document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes[0])
				let length = document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes.length;
				while(length > 0){
					document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes[0].remove();
					length = document.getElementsByClassName('Terminal')[0].childNodes[0].childNodes[0].childNodes.length;
				}
			}

			terminalObj._inputLine.textContent = terminalObj.promptText;
			terminalObj.scrollBottom();

		}else{

			terminalObj.print(terminalObj._inputLine.textContent);
        	terminalObj._inputLine.textContent = terminalObj.promptText;
        	terminalObj.scrollBottom();
		}

      } else if (
        e.key == "ArrowRight" ||
        e.key == "ArrowLeft" ||
        e.key == "ArrowUp" ||
        e.key == "ArrowDown"||
		e.key == "Shift"||
		e.key == "Meta" ||
		e.key == "Alt" ||
		e.key == "Control"
      ) {
        //nothing

      } else if (e.key == "Tab") {
        //add 2 space
        terminalObj._inputLine.textContent =
          terminalObj._inputLine.textContent + `   `;
		  
      } else if (e.key == "Backspace") {
        if (terminalObj._inputLine.textContent != terminalObj.promptText) {
          const length = terminalObj._inputLine.textContent.length;
          terminalObj._inputLine.textContent = terminalObj._inputLine.textContent.substring(0, length - 1);
        }
      } else {
        //other commands

        //let show text if isn't Enter or Backspace
        terminalObj._inputLine.textContent = terminalObj._inputLine.textContent + e.key;
		  
        if (terminalObj._inputLine.textContent.length > 60) {
          terminalObj.print(
            terminalObj._inputLine.textContent.substring(0, 60)
          );

          let str = terminalObj._inputLine.textContent.substring( 80, terminalObj._inputLine.textContent.length - 1);
          terminalObj._inputLine.textContent = str;
        }

		
      }
    };

    inputField.focus();
  };

  var TerminalConstructor = function (containerId) {
    
	let terminalObj = this;

    this.html = document.createElement("div");
    this.html.className = "Terminal";
    this.promptText = "";

    this._innerWindow = document.createElement("div");
    this._output = document.createElement("p");
    this._promptPS = document.createElement("span");
    this._inputLine = document.createElement("span"); //the span element where the users input is put
    this._cursor = document.createElement("span");
    this._input = document.createElement("p"); //the full element administering the user input, including cursor
    this._shouldBlinkCursor = true;

    this.cursorTimer;
    this.fireCursorInterval = function (inputField) {
      if (terminalObj.cursorTimer) {
        clearTimeout(terminalObj.cursorTimer);
      }
      terminalObj.cursorTimer = setTimeout(function () {
        if (inputField.parentElement && terminalObj._shouldBlinkCursor) {
          terminalObj._cursor.style.visibility =
            terminalObj._cursor.style.visibility === "visible"
              ? "hidden"
              : "visible";
          terminalObj.fireCursorInterval(inputField);
        } else {
          terminalObj._cursor.style.visibility = "visible";
        }
      }, 500);
    };

    this.scrollBottom = function () {
      this.html.scrollTop = this.html.scrollHeight;
    };

    this.print = function (message) {
      var newLine = document.createElement("div");
      newLine.textContent = message;
      this._output.appendChild(newLine);
      this.scrollBottom();
      return this;
    };

    this.input = function (message) {
      promptInput(this, message, PROMPT_INPUT);
      return this;
    };

    this.password = function (message) {
      promptInput(this, message, PROMPT_PASSWORD);
      return this;
    };

    this.confirm = function (message) {
      promptInput(this, message, PROMPT_CONFIRM);
      return this;
    };

    this.clear = function () {
      this._output.innerHTML = "";
      return this;
    };

    this.sleep = function (milliseconds) {
      setTimeout(milliseconds);
      return this;
    };

    this.setTextSize = function (size) {
      this._output.style.fontSize = size;
      this._input.style.fontSize = size;
      return this;
    };

    this.setTextColor = function (col) {
      this.html.style.color = col;
      this._cursor.style.background = col;
      return this;
    };

    this.setBackgroundColor = function (col) {
      this.html.style.background = col;
      return this;
    };

    this.setWidth = function (width) {
      this.html.style.width = width;
      return this;
    };

    this.setHeight = function (height) {
      this.html.style.height = height;
      return this;
    };

    this.blinkingCursor = function (bool) {
      bool = bool.toString().toUpperCase();
      this._shouldBlinkCursor =
        bool === "TRUE" || bool === "1" || bool === "YES";
      return this;
    };

    this.setPrompt = function (promptPS) {
      this._promptPS.textContent = promptPS;
      return this;
    };

    this.getVersion = function () {
      console.info(`TerminalJS ${VERSION}`);
      return VERSION;
    };

    this._input.appendChild(this._promptPS);
    this._input.appendChild(this._inputLine);
    this._input.appendChild(this._cursor);
    this._innerWindow.appendChild(this._output);
    this._innerWindow.appendChild(this._input);
    this.html.appendChild(this._innerWindow);

    this.setBackgroundColor("black")
      .setTextColor("white")
      .setTextSize("1em")
      .setWidth("100%")
      .setHeight("100%");

    this.html.style.fontFamily = "courier-new, courier, monospace";
    this.html.style.margin = "0";
    this.html.style.overflow = "auto";
    this.html.style.whiteSpace = "pre";
    this._innerWindow.style.padding = "10px";
    this._input.style.margin = "0";
    this._output.style.margin = "0";
    this._cursor.style.background = "white";
    this._cursor.innerHTML = "C"; //put something in the cursor..
    this._cursor.style.display = "none"; //then hide it
    this._input.style.display = "none";

    if (typeof containerId === "string") {
      let container = document.getElementById(containerId);
      container.innerHTML = "";
      container.appendChild(this.html);
    } else {
      throw "terminal requires (string) parent container id in the constructor";
    }
  };

  return TerminalConstructor;

})();
