
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

          // Data to be posted
          const data1 = {
            "@odata.context" : "$metadata#Project/$entity",
            "@odata.metadataEtag" : "W/\"20240325184749\"",
            "ProjectExternalID" : "B-11-00055",
            "ProjectDescription" : "HKH Pav. 7",
            "ProjectProfileCode" : "1000",
            "CompanyCode" : "1000",
            "ControllingArea" : "1000",
            "SAP__Messages" : [
            ]
          };
          
          const data = {
            "@odata.context" : "$metadata#Project/$entity",
            "@odata.metadataEtag" : "W/\"20240325184749\"",
          
            "ProjectExternalID" : "B-11-00027",
            "ProjectDescription" : "HKH Pav. 7",
            "ProjectLangBsdDescription" : "",
            "ProjectProfileCode" : "1000",
            "CompanyCode" : "1000",
            "ControllingArea" : "1000",
            "FunctionalArea" : "",
            "ProfitCenter" : "",
            "PlannedStartDate" : null,
            "PlannedEndDate" : "2024-04-15",
            "WorkCenterLocation" : "",
            "TaxJurisdiction" : "",
            "ResponsiblePerson" : "0",
            "ResponsiblePersonName" : "",
            "ApplicantCode" : "0",
            "ApplicantName" : "",
            "CreatedByUser" : "31601306",
            "CreationDate" : "2024-04-15",
            "LastChangedByUser" : "",
            "LastChangeDate" : null,
            "BasicDatesLastScheduledDate" : null,
            "FcstdDatesLastScheduledDate" : null,
            "FactoryCalendar" : "AT",
            "SchedulingDurationUnit" : "DAY",
            "ForecastedStartDate" : null,
            "ForecastedEndDate" : null,
            "BusinessArea" : "",
            "Plant" : "",
            "Currency" : "EUR",
            "BudgetProfile" : "1000",
            "PlanningProfile" : "000001",
            "InvestmentProfile" : "",
            "ProjInterestCalcProfile" : "",
            "ResultAnalysisInternalID" : "",
            "ControllingObjectClass" : "IV",
            "NetworkProfile" : "0000002",
            "WBSSchedulingProfile" : "000000000001",
            "PlanningMethForProjBasicDate" : "3",
            "PlanningMethForProjFcstdDate" : "3",
            "NetworkAssignmentType" : "2",
            "WBSIsStatisticalWBSElement" : true,
            "WBSIsMarkedForIntegratedPlng" : false,
            "ProjectHasOwnStock" : false,
            "InventorySpecialStockValnType" : "",
            "WBSIsMarkedForAutomReqmtGrpg" : false,
            "SalesOrganization" : "",
            "DistributionChannel" : "",
            "Language" : "",
            "WBSElementMaskID" : "",
            "Division" : "",
            "DynItemProcessorPrfl" : "",
            "JointVenture" : "",
            "JointVentureCostRecoveryCode" : "",
            "JointVentureEquityType" : "",
            "JointVentureObjectType" : "",
            "JntIntrstBillgClass" : "",
            "JntIntrstBillgSubClass" : "",
            "StatusProfile" : "PS000001",
            "WBSStatusProfile" : "PS000002",
            "SimulationProfile" : "",
            "SchedulingScenario" : "",
            "DistributionProfile" : "",
            "PartnerDeterminationProcedure" : "",
            "FreeDefinedTableFieldSemantic" : "",
            "FreeDefinedAttribute01" : "",
            "FreeDefinedAttribute02" : "",
            "FreeDefinedAttribute03" : "",
            "FreeDefinedAttribute04" : "",
            "FreeDefinedQuantity1" : 0.000,
            "FreeDefinedQuantity1Unit" : "",
            "FreeDefinedQuantity2" : 0.000,
            "FreeDefinedQuantity2Unit" : "",
            "FreeDefinedAmount1" : 0.00,
            "FreeDefinedAmount1Currency" : "",
            "FreeDefinedAmount2" : 0.00,
            "FreeDefinedAmount2Currency" : "",
            "FreeDefinedDate1" : null,
            "FreeDefinedDate2" : null,
            "FreeDefinedIndicator1" : false,
            "FreeDefinedIndicator2" : false,
            "StatusCombinationCode" : 0,
            "SAP__Messages" : [
          
            ]
          }
          // Perform the fetch request
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url, true);
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
          xhr.setRequestHeader('Sec-Fetch-Mode', 'cors');
          xhr.setRequestHeader('Cache-Control', 'no-cache');
          xhr.setRequestHeader("X-CSRF-Token", "Fetch");
          //xhr.setRequestHeader("X-Referrer-Hash", window.location.hash);
          xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://itsvac-test.eu20.hcs.cloud.sap');
          xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT, POST, DELETE');
          xhr.setRequestHeader('Access-Control-Allow-Headers', 'setcookie, x-csrf-token, X-Csrf-Token, x-csrf-token, origin, accept, apikey, dataserviceversion, accept-language, x-httpmethod,content-type,X-Requested-With, x-sap-cid, Authorization, mysapsso2');
         //x-csrf-token X-Csrf-Token, x-csrf-token
          xhr.setRequestHeader('Access-Control-ExposeHeaders', 'set-cookie, x-csrf-token, x-http-method');
          xhr.withCredentials = true;

          
          xhr.onload = function () {
              // do something to response
              console.log(this.responseText);
          };
          xhr.send(data);
          
        const dataBinding = this.dataBinding
        if (!dataBinding || dataBinding.state !== 'success') {
          return
        }
      }
    }
  

    customElements.define('com-sap-sac-exercise-aa31', Main)
  })()