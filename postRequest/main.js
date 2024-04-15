
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

        // Options for the fetch request



        const options = {
          method: 'POST',
          credentials:"include",
          headers: {
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': 'itsvac-test.eu20.hcs.cloud.sap',
            //'Access-Control-Allow-Credentials': 'true',
            //'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': 'X-Csrf-Token, x-csrf-token, x-sap-cid, Content-Type, Authorization, mysapsso2'
            //'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
            //'Access-Control-Expose-Headers': 'X-CSRF-TOKEN,SAP-REWRITEURL,SAP-URL-SESSION-ID,SAP-PERF-FESREC,SAP-SYSTEM',
            //'Access-Control-Max-Age': '60'
          }
        };

          // Step 1. Send GET request to fetch "X-CSRF-Token", "Fetch"
          var xhrGet = new XMLHttpRequest();
          xhrGet.open('GET', url, true);
          xhrGet.setRequestHeader("X-CSRF-Token", "Fetch");
          xhrGet.setRequestHeader('Content-type', 'application/json');
          xhrGet.setRequestHeader('Access-Control-Allow-Credentials', true);
          xhrGet.setRequestHeader('Cache-Control', 'no-cache');
          xhrGet.setRequestHeader('Access-Control-Allow-Origin', 'https://itsvac-test.eu20.hcs.cloud.sap');
          xhrGet.setRequestHeader('Access-Control-Allow-Methods', 'GET');
          xhrGet.withCredentials = true;

          xhrGet.onload = function () {
            // do something to response
            console.log(this.responseText);
          };

          xhrGet.onreadystatechange = function() {
            if (xhrGet.status === 200) {
              var csrfToken = xhrGet.getResponseHeader('X-CSRF-Token');
              console.log('CSRF Token:', csrfToken);
            } else {
              console.error('Request failed with status:', xhrGet.status);
            }
          };
          
          xhrGet.send();

          
          // Data to be posted
          const data = {
            "@odata.context" : "$metadata#Project/$entity",
            "@odata.metadataEtag" : "W/\"20240325184749\"",
            "ProjectExternalID" : "B-11-00099",
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
          xhr.setRequestHeader('Sec-Fetch-Mode', 'cors');
          xhr.setRequestHeader('Cache-Control', 'no-cache');
          //xhr.setRequestHeader("X-Referrer-Hash", window.location.hash);
          xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://itsvac-test.eu20.hcs.cloud.sap');
          xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT, POST, DELETE');
          xhr.setRequestHeader('X-CSRF-Token', csrfToken);
          //xhr.setRequestHeader('Access-Control-Allow-Headers',);

          //xhr.setRequestHeader('Access-Control-Allow-Headers',
          //'setcookie, x-csrf-token, X-Csrf-Token, x-csrf-token, origin, accept, apikey, dataserviceversion, accept-language, x-httpmethod,content-type,X-Requested-With, x-sap-cid, Authorization, mysapsso2'
         //);


         //x-csrf-token X-Csrf-Token, x-csrf-token
          //xhr.setRequestHeader('Access-Control-ExposeHeaders', 'set-cookie, x-csrf-token, x-http-method');
          xhr.withCredentials = true;

          
          xhr.onload = function () {
              // do something to response
              console.log(this.responseText);
          };
          xhr.send(data);//xhr.send(data);
          
        const dataBinding = this.dataBinding
        if (!dataBinding || dataBinding.state !== 'success') {
          return
        }
      }
    }
  

    customElements.define('com-sap-sac-exercise-aa31', Main)
  })()