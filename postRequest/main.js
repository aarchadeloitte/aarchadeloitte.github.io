
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

          var xhrGet = new XMLHttpRequest();
          
          xhrGet.open('GET', url, true);
          xhrGet.setRequestHeader('X-CSRF-Token', 'Fetch');
          xhrGet.setRequestHeader('Access-Control-Allow-Methods', 'GET');
          xhrGet.setRequestHeader('Access-Control-Allow-Credentials', true);
          //xhrGet.setRequestHeader('Access-Control-Allow-Headers', 'X-Csrf-Token');
          xhrGet.setRequestHeader('Access-Control-Expose-Headers','X-Csrf-Token,x-csrf-token');
          xhrGet.setRequestHeader('Content-Type', 'application/json');
          xhrGet.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

          xhrGet.withCredentials = true;

          xhrGet.send();

          xhrGet.onreadystatechange = () => {
            if (xhrGet.readyState === 4) {
              const headers = xhrGet.getAllResponseHeaders();
              const __XCsrfToken = xhrGet.getResponseHeader('x-csrf-token');
              const arr = headers.trim().split(/[\r\n]+/);
              console.log(arr);
            }
          };

          xhrGet.onload = function () {
            console.log(this.responseText);
            console.log(this.getAllResponseHeaders());
            console.log(xhrGet.getAllResponseHeaders());
          };
          

          // Data to be posted
          const data = {
            "@odata.context" : "$metadata#Project/$entity",
            "@odata.metadataEtag" : "W/\"20240325184749\"",
            "ProjectExternalID" : "B-33-00099",
            "ProjectDescription" : "HKH Pav. 7",
            "ProjectProfileCode" : "1000",
            "CompanyCode" : "1000",
            "ControllingArea" : "1000",
            "SAP__Messages" : [
            ]
          };
          
          // Step 2. Send POST request
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url, true);
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
          //xhr.setRequestHeader('Sec-Fetch-Mode', 'cors');
          xhr.setRequestHeader('Cache-Control', 'no-cache');
          xhr.setRequestHeader("X-Referrer-Hash", window.location.hash);
          xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://itsvac-test.eu20.hcs.cloud.sap');
          xhr.setRequestHeader('Access-Control-Allow-Methods', 'PUT');
          xhr.setRequestHeader('X-CSRF-Token', __XCsrfToken);
          xhr.withCredentials = true;
          xhr.onload = function () {
              // do something to response
              console.log(this.responseText);
          };
          xhr.send(JSON.stringify(data));      
        const dataBinding = this.dataBinding
        if (!dataBinding || dataBinding.state !== 'success') {
          return
        }
      }
    }

    customElements.define('com-sap-sac-exercise-aa31', Main)
  })()