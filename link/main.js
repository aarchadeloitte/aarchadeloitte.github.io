// For CALLBACKS
var getScriptPromisify = (src) => {
    return new Promise((resolve) => {
      $.getScript(src, resolve);
    });
  };
  
  (function () {
    // Styles
    const template = document.createElement('template')
    template.innerHTML = `
        <a href="id_url">link text</a>
    `

    class Main extends HTMLElement {
      constructor () {
      super()
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))
      this._url  = this._shadowRoot.getElementById('id_url')
      
      // Must include for OnClick action in SAC
      this.addEventListener("click", event => {
          var event = new Event("onClick");
          this.dispatchEvent(event);
      });
  
      this.render()
      }
  
      onCustomWidgetResize (width, height) {
          this.render()
      }
  
      onCustomWidgetBeforeUpdate (changedProps) {
         this.render(); // Start rendering after D3.js is loaded
      }
  
      onCustomWidgetAfterUpdate (changedProps) {
          this.render();
      }
        
      onCustomWidgetDestroy () {
      }
      
      // Custom function
      getSelectedRegion () {
        let _urlData = this._url.childNodes
      }
      
      
      async render () {


      }







    }
    customElements.define('com-sap-sac-exercise-aa18', Main)
  })()