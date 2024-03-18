
(function () {
    const template = document.createElement('template')
    template.innerHTML = `
          <style>
          </style>
          <div id="root" style="width: 100%; height: 100%;">

          </div>
        `

    class Main extends HTMLElement {
      constructor () {
        super()
  
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
  
        this._root = this._shadowRoot.getElementById('root')

      }

      setLink (link) {
        this._link = link
      }


  
  
      onCustomWidgetResize (width, height) {
        this.render()
      }
  
      onCustomWidgetAfterUpdate (changedProps) {
        this.render()
      }
  
      onCustomWidgetDestroy () {
      }
  
      async render () {
        const dataBinding = this.dataBinding
        if (!dataBinding || dataBinding.state !== 'success') {
          return
        }
        this._root.textContent = this._link
      }
    }
  
    customElements.define('com-sap-sac-exercise-aa30', Main)
  })()