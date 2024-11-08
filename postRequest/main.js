
(function () {
  const template = document.createElement('template')
  template.innerHTML = `
        <style>
        </style>
        
        <div id="root" style="width: 100%; height: 100%;">
          <p><a id = "link_href" href="https://www.google.com/" target="_blank" >Post request</a></p>
        </div>
      `

  class Main extends HTMLElement {
    constructor () {
      super()
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))

    }

    setLink (link) {
      this._link = link
    }

    setServerSAP (ServerSAP) {
      this._ServerSAP = ServerSAP
    }

    setODataServiceSAP (ODataService) {
      this._ODataService = ODataService
    }

    sendPostData (postData) {
      this._postData = postData
      this.render()
    }

    sendGet () {
      this.render()
    }

    getResponse () {
      return this.Response
    }

    getStatus () {
      return this.Status
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

      const url = `https://${this._ServerSAP}/${this._ODataService}`;
      
      var xhrGet = new XMLHttpRequest();
      xhrGet.open('GET', url, true);
      xhrGet.setRequestHeader('X-CSRF-Token', 'Fetch');
      xhrGet.setRequestHeader('Access-Control-Allow-Methods', 'GET');
      xhrGet.setRequestHeader('Access-Control-Allow-Origin', 'https://itsvac-test.eu20.hcs.cloud.sap');
      xhrGet.setRequestHeader('Access-Control-Allow-Credentials', true);
      xhrGet.setRequestHeader('Access-Control-Expose-Headers','X-Csrf-Token,x-csrf-token');
      xhrGet.setRequestHeader('Content-Type', 'application/json');
      xhrGet.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhrGet.withCredentials = true;
      xhrGet.send();
      this.Status = xhrGet.status
      
        xhrGet.onreadystatechange = () => {
          if (xhrGet.readyState === 4) {

            this.Status = xhrGet.status
            
            this.Response = JSON.parse(xhrGet.responseText);
            
            if (this._postData) {
              const data = this._postData; // Data to be posted
              const __XCsrfToken = xhrGet.getResponseHeader('x-csrf-token');

              // Step 2. Send POST request
              var xhr = new XMLHttpRequest();
              xhr.open('POST', url, true);
              xhr.setRequestHeader('Content-type', 'application/json');
              xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
              xhr.setRequestHeader('Cache-Control', 'no-cache');
              xhr.setRequestHeader("X-Referrer-Hash", window.location.hash);
              xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://itsvac-test.eu20.hcs.cloud.sap');
              xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST');
              xhr.setRequestHeader('X-CSRF-Token', __XCsrfToken);
              xhr.withCredentials = true;

              xhr.send(JSON.stringify(data));
              xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                  if (xhr.status == 201) {
                     //Get Status
                    this.Response = JSON.parse(xhr.responseText);
                    //Get Status
                    this.Status = xhr.status
                  } else {
                    //Get Status
                    this.Status = xhr.status
                  };
                };
              };
            };
          };
        };
        
      const dataBinding = this.dataBinding
      if (!dataBinding || dataBinding.state !== 'success') {
        return
      }
    }
  }

  customElements.define('com-sap-sac-aa', Main)
})()
