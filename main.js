var getScriptPromisify = (src) => {
  return new Promise((resolve) => {
    $.getScript(src, resolve);
  });
};

(function () {
  const template = document.createElement('template')
  template.innerHTML = `
		<style>
					  /* Your CSS styles here */
			svg {
			  /* border: 1px solid #ccc; */
			  transform: scaleY(-1); /* Flip the SVG vertically */
			  position: relative; /* Required for positioning tooltips */
			}
			path {
			  fill: #eee;
			  stroke: #aaa;
			  stroke-width: 0.5;
			  cursor: pointer;
			}
			.selected {
			  fill: #00B46E; /* Change color of selected region */
			  stroke: #aaa;
			  stroke-width: 1.5;
			}
			path:hover {
			  fill: #ccc;
			}
			.tooltip {
			  position: absolute;
			  background: rgba(255, 255, 255, 0.9);
			  border: 1px solid #ccc;
			  padding: 5px;
			  pointer-events: none; /* Allows mouse events to go through the tooltip */
			  display: none; /* Hide tooltip by default */
			}
        </style>
		<svg id="map" width="800" height="800"></svg>
      `
  class Main extends HTMLElement {
    constructor () {
	super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))
      this.text = "__";
	  this._svg  = this._shadowRoot.getElementById('map')

      // Include D3.js
      this.script = document.createElement('script');
      this.script.src = 'https://d3js.org/d3.v7.min.js';
      this.script.async = true;
	  	  
	  document.head.appendChild(this.script);
	  this.render();
	}

    onCustomWidgetResize (width, height) {
		this.render()
	}
    
    onCustomWidgetBeforeUpdate (changedProps) {
       this.render(); // Start rendering after D3.js is loaded
    }
	  
    onCustomWidgetDestroy () {
    }

    async render () {
		
	  await getScriptPromisify('https://d3js.org/d3.v7.min.js');

      
	this.text = "___2____";
	const svg = d3.select(this._svg);
	this.text = "___3____";
        d3.json("https://aarchadeloitte.github.io/austria.geojson")
            .then(data => {
                // Create a projection to transform geographic coordinates to SVG coordinates
                const projection = d3.geoIdentity().fitSize([800, 800], data);
				
                // Create a path generator
                const pathGenerator = d3.geoPath().projection(projection);
		this.text = "___4____";
                // Draw paths for each feature
                svg.selectAll("path")
                    .data(data.features)
                    .enter().append("path")
                    .attr("d", pathGenerator)
		    .attr("title", d => d.properties.name)
                    .on("click", function (event, d) {
			this.dispatchEvent(new Event('onClick'))
                        // Check if the class exists, then toggle it
                        const isSelected = d3.select(this).classed("selected")
			const selectedRegionValue = d.properties.name
			console.log('data___q1')
      			this.text = "___5____";
			console.log('DATAAAAAAAA' + d.properties.name);
			console.log('thistext' + this.text);

                        if (isSelected) {
			    d3.select(this).classed("selected", false);
			    this.text = "___6____";
                        } else {	
			    svg.selectAll("path").classed("selected", false);
			    this.text = "___7____";		
                            d3.select(this).classed("selected", true);
                        }

	                });
            })
            .catch(error => console.error('Error fetching data:', error));	
	}
	
	getSelectedRegion () {
		return this.text;
	}
  }

  customElements.define('com-sap-sac-exercise-aa18', Main)
})()
