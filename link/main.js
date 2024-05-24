(function () {
  const template = document.createElement('template');
  template.innerHTML = `
       <style>
        #root {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            height: 100vh; /* Ensure the div takes the full height of the viewport */
        }
        .link-container {
            position: relative; /* Needed for the arrow positioning */
            display: flex;
            justify-content: left;
            left: 7px;
            align-items: left;
            padding: 20px; /* Add padding to create space inside the box */
            border: 0.5px solid black; /* Add a border around the box */
            background-color: #FCFCFC; /* Optional: Add a background color to the box */
            box-shadow: 0 4px 8px rgba(0, 0, 0, .3); 
        }
        .link-container::before {
            content: '';
            position: absolute;
            left: -5.5px; /* Adjust the position to seamlessly integrate with the border */
            top: 50%;
            transform: translateY(-50%) rotate(135deg); /* Center and rotate the arrow */
            border: solid black;
            border-width: 0 0.5px 0.5px 0;
            display: inline-block;
            padding: 5px;
            background-color: #FCFCFC; /* Match the background color of the box */
        }
        #link_href {
            text-decoration: link; /* Remove the underline from the link */
            color: #5E97C4; /* Set the text color */
            font-family: Arial, sans-serif; /* Set a font for better readability */
        }

       </style>
        <div id="root">
            <div class="link-container">
                <a id="link_href" href="https://www.google.com/" target="_blank"></a>
            </div>
        </div>
  `;


  class Main extends HTMLElement {
      constructor () {
          super();
  
          this._shadowRoot = this.attachShadow({ mode: 'open' });
          this._shadowRoot.appendChild(template.content.cloneNode(true));
  
          this._root = this._shadowRoot.getElementById('root');
          this._link_href = this._shadowRoot.getElementById('link_href');
  
          //this.x_coordinate = 0;
          //this.y_coordinate = 0;
  
          document.addEventListener('click', (event) => {
                this.x_coordinate = event.pageX; // Horizontal coordinate of the click event
                this.y_coordinate = event.pageY; // Vertical coordinate of the click event

              //this.x_coordinate = event.clientX; // Horizontal coordinate of the click event
              //this.y_coordinate = event.clientY; // Vertical coordinate of the click event
  
              // Output the coordinates
                console.log('Clicked at coordinates: (' + this.x_coordinate + ', ' + this.y_coordinate + ')');
                console.log(typeof(this.x_coordinate));
                console.log(typeof(this.y_coordinate));
          });
      }
  
      setLink (link) {
          this._link = link;
          this.render();
      }
  
      setDimensionId (DimensionId) {
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
          this._link_href.textContent = this._DimensionId;
          this._link_href.href = this._link;
  
          const dataBinding = this.dataBinding;
          if (!dataBinding || dataBinding.state !== 'success') {
              return;
          }    
      }
  }

  customElements.define('com-sap-sac-exercise-aa30', Main);
})();
