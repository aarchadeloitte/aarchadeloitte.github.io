
(function () {
    const template = document.createElement('template')
    template.innerHTML = `
          <style>
          </style>
          
          <div id="root" style="width: 100%; height: 100%;">
            <p><a id = "link_href" href="https://www.google.com/" target="_blank" ></a></p>
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

      setDimensionId (DimensionId) {
        this._DimensionId = DimensionId
        this.render()
      }

      getLink () {
        return this._link
      }

      get_X_Coordinate () {
        return this.x_coordinate
      }

      get_Y_Coordinate () {
        return this.y_coordinate
      }

      onCustomWidgetResize (width, height) {
      }

      onCustomWidgetAfterUpdate (changedProps) {
      }
  
      onCustomWidgetDestroy () {
      }
  
      async render () {

        document.addEventListener('click', function(event) {
          this.x_coordinate = event.clientX; // Horizontal coordinate of the click event
          this.y_coordinate = event.clientY; // Vertical coordinate of the click event

          // Output the coordinates
          console.log('Clicked at coordinates: (' + this.x + ', ' + this.y + ')');
        });

        this._link_href.textContent = this._DimensionId
        this._link_href.href        = this._link

        const dataBinding = this.dataBinding
        if (!dataBinding || dataBinding.state !== 'success') {
          return
        }    
      }
    }

    customElements.define('com-sap-sac-exercise-aa30', Main)
  })()