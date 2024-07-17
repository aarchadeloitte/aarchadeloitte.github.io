(function () {
  const template = document.createElement('template');
  template.innerHTML = `
       <style>
        #root {
            width: 300px;
            justify-content: flex-start;
            align-items: flex-start;
            height: 100vh; /* Ensure the div takes the full height of the viewport */
        }
        .link-container {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: left;
            left: 7px;
            align-items: left;
            padding: 20px;
            border: 0.5px solid black;
            background-color: #FCFCFC;
            box-shadow: 0 4px 8px rgba(0, 0, 0, .3);
        }
        .link-container::before {
            content: '';
            position: absolute;
            left: -5.5px;
            top: 50%;
            transform: translateY(-50%) rotate(135deg);
            border: solid black;
            border-width: 0 0.5px 0.5px 0;
            display: inline-block;
            padding: 5px;
            background-color: #FCFCFC;
        }
        .link {
            text-decoration: none;
            color: #5E97C4;
            font-family: Arial, sans-serif;
            margin-bottom: 10px;
            display: block; /* Ensures each link starts on a new line */
        }

       </style>
       <div id="root">
            <div class="link-container" id="links-container"> </div>
        </div>>

  `;

  class Main extends HTMLElement {
      constructor () {
          super();
  
          this._shadowRoot = this.attachShadow({ mode: 'open' });
          this._shadowRoot.appendChild(template.content.cloneNode(true));
  
          this._root = this._shadowRoot.getElementById('root');
          this._linksContainer = this._shadowRoot.getElementById('links-container');

          document.addEventListener('click', (event) => {
                this.x_coordinate = event.pageX; // Horizontal coordinate of the click event
                this.y_coordinate = event.pageY; // Vertical coordinate of the click event

                console.log('Clicked at coordinates: (' + this.x_coordinate + ', ' + this.y_coordinate + ')');

        });

      }


      setLink (link) {
          this._link = link;
          this.render();
      }
  
      setDimensionId(DimensionId) {
          this._DimensionId = DimensionId;
          this.render();
      }
  
      getLink () {
          return this._link;
      }
  
      get_X_Coordinate () {
          return this.x_coordinate;
      }
  
      get_Y_Coordinate () {
          return this.y_coordinate;
      }
  
      onCustomWidgetResize (width, height) {
      }
  
      onCustomWidgetAfterUpdate (changedProps) {
      }
  
      onCustomWidgetDestroy () {
      }
  
      async render () {
        this._linksContainer.innerHTML = ''; // Clear existing links
        
        if (this._link && this._link.length > 0 && this._DimensionId && this._DimensionId.length > 0) {
            this._link.forEach((link, index) => {
                const linkElement = document.createElement('a');
                linkElement.textContent = this._DimensionId[index];
                linkElement.href = link;
                linkElement.target = '_blank';
                linkElement.classList.add('link');
                this._linksContainer.appendChild(linkElement);
            });
        }

        //this._link_href.textContent = this._DimensionId;
        //this._link_href.href = this._link;
        
        const dataBinding = this.dataBinding;
        if (!dataBinding || dataBinding.state !== 'success') {
            return;
        }
      }
  } customElements.define('com-sap-sac-exercise-aa30', Main);
})();
