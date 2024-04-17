
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
          xhrGet.setRequestHeader('X-Csrf-Token', 'Fetch');
          xhrGet.setRequestHeader('x-csrf-token', 'Fetch');
          xhrGet.setRequestHeader('X-CSRF-token', 'Fetch');
          xhrGet.setRequestHeader('Access-Control-Allow-Origin', '*');
          xhrGet.setRequestHeader('Access-Control-Allow-Methods', 'GET');
          xhrGet.setRequestHeader('Access-Control-Allow-Credentials', true);
          xhrGet.setRequestHeader('Access-Control-Expose-Headers','X-Csrf-Token,x-xsrf-token');
          xhrGet.withCredentials = true;

          xhrGet.send();

          xhrGet.onload = function () {
            console.log(this.responseText);
            console.log(this.getAllResponseHeaders());
            console.log(xhrGet.getAllResponseHeaders());
          };

          xhrGet.onreadystatechange = () => {
            if (xhrGet.readyState === 2) {
              const headers = xhrGet.getAllResponseHeaders();
              const arr = headers.trim().split(/[\r\n]+/);
              console.log(arr);
            }
          };
          
        const dataBinding = this.dataBinding
        if (!dataBinding || dataBinding.state !== 'success') {
          return
        }
      }
    }
  

    customElements.define('com-sap-sac-exercise-aa31', Main)
  })()