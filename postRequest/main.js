
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
          method: 'GET',
          credentials:"include",
          headers: {
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': 'https://itsvac-test.eu20.hcs.cloud.sap',
            //'Access-Control-Allow-Credentials': 'true',
            //'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': 'X-Csrf-Token, x-csrf-token, x-sap-cid, Content-Type, Authorization, mysapsso2'
            //'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
            //'Access-Control-Expose-Headers': 'X-CSRF-TOKEN,SAP-REWRITEURL,SAP-URL-SESSION-ID,SAP-PERF-FESREC,SAP-SYSTEM',
            //'Access-Control-Max-Age': '60'
          }
        };

          // Perform the fetch request
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.setRequestHeader('Access-Control-Allow-Credentials', true);

          xhr.setRequestHeader('Sec-Fetch-Mode', 'cors');
          
          xhr.setRequestHeader('Cache-Control', 'no-cache');

          xhr.setRequestHeader('Sec-Fetch-Dest', 'empty');

          xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
          xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
          xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Csrf-Token, x-csrf-token, x-sap-cid, Content-Type, Authorization, mysapsso2');
          xhr.withCredentials = true;

          xhr.onload = function () {
              // do something to response
              console.log(this.responseText);
          };
          xhr.send();
          
        const dataBinding = this.dataBinding
        if (!dataBinding || dataBinding.state !== 'success') {
          return
        }
      }
    }
  

    customElements.define('com-sap-sac-exercise-aa31', Main)
  })()