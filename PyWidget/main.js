
(function () {
    const template = document.createElement('template')
    template.innerHTML = `
          <style>
          </style>
          
          <div id="root" style="width: 100%; height: 100%;">
            <p><a id = "link_href" href="https://www.google.com/" target="_blank" >Google</a></p>
          </div>
        `
  
    class Main extends HTMLElement {
      constructor () {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
      }
  
      onCustomWidgetResize (width, height) {
      }
  
      onCustomWidgetAfterUpdate (changedProps) {
      }
  
      onCustomWidgetDestroy () {
      }
  
      async render () {
  
        const url = `https://${this._ServerSAP}/${this._ODataService}`;
      
          
        const dataBinding = this.dataBinding
        if (!dataBinding || dataBinding.state !== 'success') {
          return
        }
      }
    }
  
    customElements.define('com-sap-sac-py', Main)
  })()