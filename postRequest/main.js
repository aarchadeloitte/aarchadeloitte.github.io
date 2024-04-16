
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

          xhrGet.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                  const responseHeaders = this.getAllResponseHeaders();
            }
          };
          
          xhrGet.open('GET', url, true);
          xhrGet.setRequestHeader("X-CSRF-Token", "Fetch");
          xhrGet.setRequestHeader('Content-type', 'application/json');
          xhrGet.setRequestHeader('Access-Control-Allow-Credentials', true);
          xhrGet.setRequestHeader('Cache-Control', 'no-cache');
          xhrGet.setRequestHeader('Access-Control-Allow-Origin', 'https://itsvac-test.eu20.hcs.cloud.sap');
          xhrGet.setRequestHeader('Access-Control-Allow-Methods', 'GET');
          xhrGet.setRequestHeader('Access-Control-Allow-Headers','setcookie, x-csrf-token, X-Csrf-Token, x-csrf-token');
          xhrGet.withCredentials = true;

          xhrGet.onload = function () {
            // do something to response
            console.log(this.responseText);
          }; 

          xhrGet.send();

          
        const dataBinding = this.dataBinding
        if (!dataBinding || dataBinding.state !== 'success') {
          return
        }
      }
    }
  

    customElements.define('com-sap-sac-exercise-aa31', Main)
  })()