
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
            'Access-Control-Allow-Origin': 'https://itsvac-test.eu20.hcs.cloud.sap',
            'Access-Control-Allow-Credentials': 'true',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Headers': 'X-Csrf-Token, x-csrf-token, x-sap-cid, Content-Type, Authorization, mysapsso2',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
            'Access-Control-Expose-Headers': 'X-CSRF-TOKEN,SAP-REWRITEURL,SAP-URL-SESSION-ID,SAP-PERF-FESREC,SAP-SYSTEM',
            'Access-Control-Max-Age': '60',
            'Cookie': 'MYSAPSSO2=AjQxMDMBABgzADEANgAwADEAMwAwADYAIAAgACAAIAACAAY2ADEAMgADABBGADEAUwAgACAAIAAgACAABAAYMgAwADIANAAwADQAMAA0ADEAMAAwADkABQAEAAAACAYAAlgACQACRAD%2fAVcwggFTBgkqhkiG9w0BBwKgggFEMIIBQAIBATELMAkGBSsOAwIaBQAwCwYJKoZIhvcNAQcBMYIBHzCCARsCAQEwcDBkMQswCQYDVQQGEwJERTEcMBoGA1UEChMTU0FQIFRydXN0IENvbW11bml0eTETMBEGA1UECxMKU0FQIFdlYiBBUzEUMBIGA1UECxMLSTAwMjExNTA5NjkxDDAKBgNVBAMTA0YxUwIICiAkAhQRRAEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTI0MDQwNDEwMDkyM1owIwYJKoZIhvcNAQkEMRYEFFKmJ39qZb4%2f9jXi4O1qO6pLiXNoMAkGByqGSM44BAMELzAtAhQF%2f78zdawNW0I5CCI3B1j%2f%21tYLyAIVAJG%2ffYW71edI370nEM4XYj7m7xyz; SAP_SESSIONID_F1S_612=rb_HmCNhw2AlexhpPn-e9mfkzDHynBHujhP6HVbqiyA%3d; sap-ssolist=O3I9ZjFzYXBwbDBfRjFTXzIwXzY2Nl9FNjEwRTZGOTI2NzQ4QjExMEMxNTQxNDMxOTExQ0E3QjIzNjQ0OUU3; sap-usercontext=sap-language=DE&sap-client=666; SAP_SESSIONID_F1S_666=WiCU5Fsyh-i58G4ofxqn7oZu8HPynBHujhP6HVbqiyA%3d'
            
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