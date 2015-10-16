/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

var APP_KEY = '1n9xi4cvUxqRDO7xkcDkA3VTROuYI6fLlYGWjzMKpQA0YhTE8dgiiIk0dXkhwOOMCmufNYdR651KrWbU';

// Instantiate Base EVRYTHNG Object
var app = new EVT.App(APP_KEY);

// save last scanned Product ID
var evtLastScannedProduct = '';

// configure ScanThng
EVT.use(EVT.Scan);
EVT.Scan.setup({redirect: false, type: 'objpic'});

// Call Back when image detection returns an error
function scanError(error) {
    console.log(error);
    $(document).ready(function () {
        $('#results').html('<h2>Error</h2>' + JSON.stringify(error, null, 2));
    });

}

// Call back when a product has been identified
function scanSuccess(data) {
    $(document).ready(function () {
        $('#results').html('<h2>Scan Successful</h2>' + JSON.stringify(data, null, 2));
        evtLastScannedProduct = data.evrythngId;
        console.log('Last Scanned Product : ' + evtLastScannedProduct);
    });
}

function scanProduct(scanType) {
    console.log('Scan Type : ' + scanType);
    app.scan({redirect: false, type: scanType})  // Override the scan type
        .then(
        scanSuccess,
        scanError
    );
}


