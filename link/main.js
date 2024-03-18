
(function () {
    const template = document.createElement('template')
    template.innerHTML = `
          <style>
          </style>
          <div id="root" style="width: 100%; height: 100%;">
          
          <a href="https://f1qappl0.test.sozvers.at:44320/sap/bc/ui2/flp#AccountingDocument-displayDocument?sap-ui-tech-hint=GUI&AccountingDocument=600000001&FiscalYear=2024&CompanyCode=1000100020240600000001">Accounting Document</a>
          
          
          </div>
        `
    class Main extends HTMLElement {
      constructor () {
        super()
  
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
  
        this._root = this._shadowRoot.getElementById('root')
      }
    }
  
    customElements.define('com-sap-sac-exercise-aa30', Main)
  })()