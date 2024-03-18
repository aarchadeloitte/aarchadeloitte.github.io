
(function () {
    const template = document.createElement('template')
    template.innerHTML = `
          <style>
          </style>
          
          <div id="root" style="width: 100%; height: 100%;">
            <a id = "link_href" >
          </div>
        `

    class Main extends HTMLElement {
      constructor () {
        super()
  
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
  
        this._root      = this._shadowRoot.getElementById('root')
        this._link_href = this._shadowRoot.getElementById('link_href')

      }

      setLink (link) {
        this._link = link
        this.render()
      }
      getLink () {
        return this._link
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

        this._link_href.textContent = `${this._link}`


        const dataBinding = this.dataBinding
        if (!dataBinding || dataBinding.state !== 'success') {
          return
        }


        
      }
    }
  

    customElements.define('com-sap-sac-exercise-aa30', Main)
  })()