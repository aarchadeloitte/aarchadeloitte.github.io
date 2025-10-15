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
      svg {
        position: relative;
        overflow: visible;
      }

      path {
        fill: #eee;
        stroke: #aaa;
        stroke-width: 0.5;
        cursor: pointer;
      }

      .selected {
        fill: #00B46E;
        stroke: #aaa;
        stroke-width: 1.5;
      }

      path:hover {
        fill: #ccc;
      }

      circle {
        fill: red;               /* Red dots */
        stroke: #fff;            /* White outline */
        stroke-width: 1.5;
        cursor: default;
        shape-rendering: geometricPrecision;
      }

      .tooltip {
        position: absolute;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #ccc;
        padding: 5px;
        pointer-events: none;
        display: none;
      }
    </style>

    <svg id="map" width="600" height="600"></svg>
  `

  class Main extends HTMLElement {
    constructor () {
      super()
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))
      this._svg = this._shadowRoot.getElementById('map')

      // Include D3.js
      this.script = document.createElement('script')
      this.script.src = 'https://d3js.org/d3.v7.min.js'
      this.script.async = true
      document.head.appendChild(this.script)

      this.render = this.render.bind(this)
      this.getSelectedRegion = this.getSelectedRegion.bind(this)

      // Must include for OnClick action in SAC
      this.addEventListener('click', event => {
        var event = new Event('onClick')
        this.dispatchEvent(event)
      })

      this.render()
    }

    onCustomWidgetResize (width, height) {
      this.render()
    }

    onCustomWidgetBeforeUpdate (changedProps) {
      this.render()
    }

    onCustomWidgetAfterUpdate (changedProps) {
      this.render()
    }

    onCustomWidgetDestroy () {}

    // Custom function
    getSelectedRegion () {
      let _svgData = this._svg.childNodes
      for (let i = 0; i < _svgData.length; i++) {
        if (_svgData[i].classList && _svgData[i].classList.value === 'selected') {
          const __index = i
          let retVal = _svgData[__index].__data__.properties.name
          return retVal
        }
      }
    }

    async render () {
      await getScriptPromisify('https://d3js.org/d3.v7.min.js')
      const svg = d3.select(this._svg)
      svg.selectAll('*').remove() // clear old render

      const width = +this._svg.getAttribute('width') || 600
      const height = +this._svg.getAttribute('height') || 600

      d3.json('https://aarchadeloitte.github.io/austria.geojson')
        .then(data => {
          // Create a projection and reflect Y so map is flipped vertically
          // Use geoIdentity with reflectY(true) so coordinates used for both paths and circles match.
          const projection = d3.geoIdentity()
                               .reflectY(true)
                               .fitSize([width, height], data)

          // Create a path generator
          const pathGenerator = d3.geoPath().projection(projection)

          // Draw paths for each feature
          svg.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr('d', pathGenerator)
            .attr('title', d => d.properties.name)
            .on('click', function (event, d) {
              const isSelected = d3.select(this).classed('selected')
              if (isSelected) {
                d3.select(this).classed('selected', false)
              } else {
                svg.selectAll('path').classed('selected', false)
                d3.select(this).classed('selected', true)
              }
            })

          // Special Locations (static dots). coords are [lon, lat]
          const specialLocations = [
            { name: 'Bregenz', coords: [9.7471, 47.5031] },
            { name: 'Graz', coords: [15.4395, 47.0707] },
            { name: 'Innsbruck', coords: [11.4041, 47.2692] },
            { name: 'Kitzbühel', coords: [12.3922, 47.4464] },
            { name: 'Kleinwalsertal', coords: [10.2000, 47.3333] },
            { name: 'Linz', coords: [14.2858, 48.3069] },
            { name: 'Salzburg', coords: [13.0455, 47.8095] },
            { name: 'Seefeld', coords: [11.1833, 47.3300] },
            { name: 'Wien', coords: [16.3738, 48.2082] },
            { name: 'Zell am See', coords: [12.7960, 47.3257] },
            { name: 'Baden', coords: [16.2308, 48.0064] },
            { name: 'Velden', coords: [13.9330, 46.6160] }
          ]

          // Draw non-clickable red dots using the same projection
          svg.selectAll('circle')
            .data(specialLocations)
            .enter()
            .append('circle')
            .attr('cx', d => projection(d.coords)[0])
            .attr('cy', d => projection(d.coords)[1])
            .attr('r', 6)
            .attr('fill', 'red')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .attr('shape-rendering', 'auto')
            .style('cursor', 'default')
            .append('title')
            .text(d => d.name)
        })
        .catch(error => console.error('Error fetching data:', error))
    }
  }

  customElements.define('com-sap-sac-exercise-aa18', Main)
})()
