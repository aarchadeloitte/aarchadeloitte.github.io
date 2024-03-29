(function () {
    const template = document.createElement('template')
    template.innerHTML = `
    
          <head>
          <meta charset="UTF-8">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.css">
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.js"></script>
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/python/python.js"></script>
          <script type="text/javascript">
              window.languagePluginUrl = 'https://cdn.jsdelivr.net/pyodide/v0.16.1/full/';
          </script>
          <script src="https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js"></script>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f8f8f8;
                  margin: 20px;
              }
      
              #notebook {
                  max-width: 800px;
                  margin: 20px auto;
                  background-color: #fff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  padding: 20px;
                  box-sizing: border-box;
              }
      
              .CodeMirror {
                  border: 1px solid #ddd;
                  border-radius: 5px;
              }
      
              #run-button {
                  background-color: #4caf50;
                  color: #fff;
                  border: none;
                  padding: 10px;
                  border-radius: 5px;
                  cursor: pointer;
              }
      
              #output {
                  width: 100%;
                  box-sizing: border-box;
                  margin-top: 10px;
                  padding: 10px;
                  background-color: #f0f0f0;
                  white-space: pre-wrap;
                  border: 1px solid #ddd;
                  border-radius: 5px;
              }
          </style>
      </head>
      
      <body>
          <div id="notebook">
              <p></p>
              <button id='run-button' onclick='evaluatePython()'>></button>
      
              <textarea id='code' placeholder='Enter Python code here...'></textarea>
              <br>
              <br>
              <div>
                  Output:
              </div>
              <textarea id='output' disabled></textarea>
          </div>
      
          <script>
          </script>
      </body>
        `
    class Main extends HTMLElement {
      constructor () {
        super()
  
        this._shadowRoot    = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this._output        = this._shadowRoot.getElementById('output')
        this._code          = this._shadowRoot.getElementById('code')

        // Initialize CodeMirror for syntax highlighting
        const codeMirror = CodeMirror.fromTextArea(this._code, {
            mode: "python",
            lineNumbers: true,
            autofocus: true
        });

        console.log(codeMirror);
      }
    }
  
    customElements.define('com-sap-sac-exercise-xxx-main', Main)
  })()