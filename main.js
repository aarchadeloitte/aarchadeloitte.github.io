// For CALLBACKS
var getScriptPromisify = (src) => {
  return new Promise((resolve) => {
    $.getScript(src, resolve);
  });
};

(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      svg {
        position: relative;
        overflow: visible;
        transform: scaleY(-1.3); /* keep your original map flip/stretch */
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
        fill: red;
        stroke: #fff;
        stroke-width: 1.5;
        shape-rendering: geometricPrecision;
        transform: scaleY(calc(1 / -1.3)); /* counteract the map distortion */
        transform-origin: center;
        cursor: default;
      }
    </style>

    <svg id="map" width="600" height="600"></svg>
  `;

  class Main extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._svg = this._shadowRoot.getElementById('map');

      this.script = document.createElement('script');
      this.script.src = 'https://d3js.org/d3.v7.min.js';
      this.script.async = true;
      document.head.appendChild(this.script);

      this.render = this.render.bind(this);
      this.getSelectedRegion = this.getSelectedRegion.bind(this);
      this.addEventListener('click', (event) => {
        var event = new Event('onClick');
        this.dispatchEvent(event);
      });

      this.render();
    }

    async render() {
      await getScriptPromisify('https://d3js.org/d3.v7.min.js');
      const svg = d3.select(this._svg);
      svg.selectAll('*').remove();

      const width = +this._svg.getAttribute('width') || 600;
      const height = +this._svg.getAttribute('height') || 600;

      d3.json('https://aarchadeloitte.github.io/austria.geojson').then((data) => {
        const projection = d3.geoIdentity().fitSize([width, height], data);
        const pathGenerator = d3.geoPath().projection(projection);

        // Draw map
        svg.selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('d', pathGenerator)
          .on('click', function (event, d) {
            const isSelected = d3.select(this).classed('selected');
            svg.selectAll('path').classed('selected', false);
            d3.select(this).classed('selected', !isSelected);
          });

        // City points
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
        ];

        svg.selectAll('circle')
          .data(specialLocations)
          .enter()
          .append('circle')
          .attr('cx', d => projection(d.coords)[0])
          .attr('cy', d => projection(d.coords)[1])
          .attr('r', 6)
          .append('title')
          .text(d => d.name);
      });
    }
  }

  customElements.define('com-sap-sac-exercise-aa18', Main);
})();
