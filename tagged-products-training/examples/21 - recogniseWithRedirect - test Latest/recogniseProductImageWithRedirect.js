/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

var projectKey = '';
// Instantiate Base EVRYTHNG Object
EVT.setup({
  apiUrl: 'https://api-staging.evrythng.net'
});

var app = new EVT.App(projectKey);
// save last scanned Product ID
var evtLastScannedProduct = '';

// configure ScanThng
var scanThng = new EVT.ScanThng(app);
scanThng.setup({redirect: true,type : 'objpic'});

// Call Back when image detection returns an error
function scanError(error) {
  'use strict';
  $(document).ready(function () {
    $('#results').html('<h2>Error</h2>' + JSON.stringify(error, null, 2));
  });
}

// Call back when a product has been identified
function scanSuccess(data) {
  'use strict';
    evtLastScannedProduct = data.evrythngId;
    console.log('Last Scanned Product : ' + evtLastScannedProduct);
}

function scanProduct() {
  'use strict';
  // Config can be changed at scan time, eg a QR CODE -> scanThng.identify({scanType: 'QRCODE'});
  scanThng.identify().then(scanSuccess,scanError);
}


