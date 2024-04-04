
(function () {
    const template = document.createElement('template')
    template.innerHTML = `
          <style>
          </style>
          
          <div id="root" style="width: 100%; height: 100%;">
            <p><a id = "link_href" href="https://www.google.com/" target="_blank" >Google</a></p>
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
      }

      setServerSAP (ServerSAP) {
        this._ServerSAP = ServerSAP
        
      }

      setODataServiceSAP (ODataService) {
        this._ODataService = ODataService
        this.render()
      }

      setPostData (postData) {
        this._postData = postData
        
      }

      setDimensionId (DimensionId) {
        this._DimensionId = DimensionId
        
      }
      
      getLink () {
        return this._link
      }
  
  
      onCustomWidgetResize (width, height) {

      }

      onCustomWidgetAfterUpdate (changedProps) {

      }
  
      onCustomWidgetDestroy () {
      }
  
      async render () {

        this._link_href.textContent = this._DimensionId
        this._link_href.href        = this._link

        const url = `https://${this._ServerSAP}/${this._ODataService}`;

        // Data to be posted
        const data = {
          "@odata.context" : "$metadata#Project/$entity",
          "@odata.metadataEtag" : "W/\"20240325184749\"",
          "ProjectExternalID" : "B-11-00015",
          "ProjectDescription" : "HKH Pav. 7",
          "ProjectProfileCode" : "1000",
          "CompanyCode" : "1000",
          "ControllingArea" : "1000",
          "SAP__Messages" : [
        
          ]
        };
        // Options for the fetch request



        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://f1sappl0.test.sozvers.at:44320',
            'Access-Control-Allow-Credentials': true,
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': 'X-Csrf-Token, x-csrf-token, x-sap-cid, Content-Type, Authorization, mysapsso2',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
            'Access-Control-Expose-Headers': 'x-csrf-token',
            'Access-Control-Max-Age': '60'
            
            //SetResponseHeader Access-Control-Allow-Origin %{HEADER:ORIGIN}
            //SetResponseHeader Access-Control-Allow-Credentials true
            //SetResponseHeader Access-Control-Allow-Methods "GET, POST, PUT, OPTIONS"
            //SetResponseHeader Access-Control-Allow-Headers "X-Csrf-Token, x-csrf-token, x-sap-cid, Content-Type, Authorization, mysapsso2"
            //SetResponseHeader Access-Control-Expose-Headers "x-csrf-token"
            //SetResponseHeader Access-Control-Max-Age 600
   




          },
          body: JSON.stringify(data)
        };

          // Perform the fetch request
        fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to perform POST request');
          }
          return response.json();
        })
        .then(data => {
          console.log('POST request successful:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

        const dataBinding = this.dataBinding
        if (!dataBinding || dataBinding.state !== 'success') {
          return
        }
      }
    }
  

    customElements.define('com-sap-sac-exercise-aa31', Main)
  })()