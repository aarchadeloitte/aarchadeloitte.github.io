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
		<style>
					  /* Your CSS styles here */
			svg {
			  /* border: 1px solid #ccc; */
			  transform: scaleY(-1.3); /* Flip the SVG vertically */
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
		
		<svg id="map" width="600" height="600" ></svg>
      `

  class Main extends HTMLElement {
    constructor () {
	super()
	this._shadowRoot = this.attachShadow({ mode: 'open' })
	this._shadowRoot.appendChild(template.content.cloneNode(true))
	this._svg  = this._shadowRoot.getElementById('map')
	
	// Include D3.js
	this.script = document.createElement('script');
	this.script.src = 'https://d3js.org/d3.v7.min.js';
	this.script.async = true;
	document.head.appendChild(this.script);
	this.render = this.render.bind(this);
	this.getSelectedRegion = this.getSelectedRegion.bind(this);
	
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
	let _svgData = this._svg.childNodes
	
	for(let i = 0; i < _svgData.length; i++) {
			if (_svgData[i].classList.value === 'selected') {
				const __index = i;
				let retVal = _svgData[__index].__data__.properties.name
				return  retVal
			}
		}
    }
	    
   	async render () {
		
		await getScriptPromisify('https://d3js.org/d3.v7.min.js');
		const svg = d3.select(this._svg);
		
		d3.json("https://aarchadeloitte.github.io/austria.geojson")
			.then(data => {
				
				// Create a projection to transform geographic coordinates to SVG coordinates
		
				const projection = d3.geoIdentity().fitSize([600, 600], data);
                // Create a path generator
                const pathGenerator = d3.geoPath().projection(projection);
				// Draw paths for each feature
                svg.selectAll("path")
                    .data(data.features)
                    .enter().append("path")
                    .attr("d", pathGenerator)
		    		.attr("title", d => d.properties.name)
                    .on("click", function (event, d) {
				// Check if the class exists, then toggle it
				const isSelected = d3.select(this).classed("selected")
				const selectedRegionValue = d.properties.name
			
				if (isSelected) {
					d3.select(this).classed("selected", false);
					} else {
						svg.selectAll("path").classed("selected", false);
						d3.select(this).classed("selected", true);
					}
				});
			// === Special Dots ===
			const specialLocations = [
			  { name: "Bregenz", coords: [9.7471, 47.5031], color: "#e41a1c" },
			  { name: "Graz", coords: [15.4395, 47.0707], color: "#377eb8" },
			  { name: "Innsbruck", coords: [11.4041, 47.2692], color: "#4daf4a" },
			  { name: "Kitzbühel", coords: [12.3922, 47.4464], color: "#984ea3" },
			  { name: "Kleinwalsertal", coords: [10.2000, 47.3333], color: "#ff7f00" },
			  { name: "Linz", coords: [14.2858, 48.3069], color: "#ffff33" },
			  { name: "Salzburg", coords: [13.0455, 47.8095], color: "#a65628" },
			  { name: "Seefeld", coords: [11.1833, 47.3300], color: "#f781bf" },
			  { name: "Wien", coords: [16.3738, 48.2082], color: "#999999" },
			  { name: "Zell am See", coords: [12.7960, 47.3257], color: "#66c2a5" },
			  { name: "Baden", coords: [16.2308, 48.0064], color: "#fc8d62" },
			  { name: "Velden", coords: [13.9330, 46.6160], color: "#8da0cb" }
			];
			
			// Draw simple non-clickable red dots
			svg.selectAll("circle")
			  .data(specialLocations)
			  .enter()
			  .append("circle")
			  .attr("cx", d => projection(d.coords)[0])
			  .attr("cy", d => projection(d.coords)[1])
			  .attr("r", 6)                     // Dot size
			  .attr("fill", "red")              // Red fill color
			  .attr("stroke", "#fff")           // White border for visibility
			  .attr("stroke-width", 1.5)
			  .style("cursor", "default")       // Non-clickable
			  .attr("shape-rendering", "auto")  // Smooth circle edges
			  .append("title")
			  .text(d => d.name);



        	})
            .catch(error => console.error('Error fetching data:', error));
   		}
  }
  customElements.define('com-sap-sac-exercise-aa18', Main)
})()
