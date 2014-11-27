/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

  var projectKey = 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui';
// Instantiate Base EVRYTHNG Object
  var app = new EVT.App(projectKey);
// save last scanned Product ID
  var evtLastScannedProduct = '';

// configure ScanThng
var scanThng = new EVT.ScanThng(app);
scanThng.setup({redirect: false,type : 'objpic'});

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
    $(document).ready(function () {
      $('#results').html('<h2>Scan Successful</h2>' + JSON.stringify(data, null, 2));
      evtLastScannedProduct = data.evrythngId;
      console.log('Last Scanned Product : ' + evtLastScannedProduct);
    });

    // get the product data from the evrythng engine using the product ID returned from the scan
    // this is for demo only to show the product returned
    app.product(data.evrythngId).read().then(function (product) {
      $(document).ready(function () {
        $('#results').append('<h2>Product</h2>' + JSON.stringify(product, null, 2));
        $('#productName').text('Product Description : ' + product.description);
      });
    });
  }

  function scanBottle() {
    'use strict';
    // Config can be changed at scan time, eg a QR CODE -> scanThng.identify({scanType: 'QRCODE'});
    scanThng.identify()
        .then(scanSuccess,scanError);
  }