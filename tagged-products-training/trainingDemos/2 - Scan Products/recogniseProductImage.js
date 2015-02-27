/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

  var projectKey = 'THVXynsjLyPPLHQO4aExWFxdiqeuNRA0oAiYIDahy87AOka61ThMZzTSCe6ZSKVxBl4KoRAgFHlWATbG';
  //var projectKey = 'QSfS1Vw6Lz3x3LF6VE4pkFe4GyFFxUjqTnYBGQ41iCBmoPzzUinRj8m4Y2xVTQGwbxmlj9Gk382elo0N';
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
  }

// bar code (ean13) : 7806723188635

  function scanProduct(scanType) {
    'use strict';
    // Config can be changed at scan time, eg a QR CODE -> scanThng.identify({scanType: 'QRCODE'});
    console.log('Scan Type : ' + scanType);
    scanThng.identify({redirect: false,type : scanType})
        .then(
        scanSuccess,
        scanError
    );
  }


