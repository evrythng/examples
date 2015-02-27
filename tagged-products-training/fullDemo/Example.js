/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

  var projectKey = 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui';
// Instantiate Base EVRYTHNG Object
  var app = new EVT.App(projectKey);
// Instantiate Coke wrapper Function
  var wrapper = new EvrythngCokeWrapper();
//  create the EVRYTHNG Usr Object
  var user = wrapper.getUserContext(EVT, app);
// Create the ScanThng Object
  var scanThng = wrapper.scanObj(EVT, app);
// save last scanned Product ID
  var evtLastScannedProduct = '';

// Call Back when image detection returns an error
  function scanError(error) {
    'use strict';
    $(document).ready(function () {
      $('#results').html('<h2>Error</h2>' + JSON.stringify(error, null, 2));
    });
    // On Error return all products from EVRYTHNG
    getAllProducts();
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
    // run rules to find redirection
    wrapper.runRules(user, data.evrythngId).then(function (reactions) {
      // display first reaction (May be multiple)
      $('#campaign').text(JSON.stringify(reactions[0].text));
    });

    var userVisits = wrapper.getVisits();
    console.log(userVisits);
    $('#visits').text(userVisits);
  }

  function scanBottle() {
    'use strict';
    // Config can be changed at scan time, eg a QR CODE -> scanThng.identify({scanType: 'QRCODE'});
    scanThng.identify()
      .then(function (response) {
        scanSuccess(response);
      },
      function (error) {
        scanError(error);
      });

//
//  scanThng.identify()
//    .then(scanSuccessCb, scanErrorCb);
  }


// list all products on EVRYTHNG tagged with Coke
  function getAllProducts() {
    'use strict';
    user.product().read({
    }).then(function (products) {
      console.log(products);
      $('#results').append('<h2>All Products</h2>' + JSON.stringify(products, null, 4));
    });
  }

// Records an Action on a product
  function recordAction(actionType) {
    'use strict';
    wrapper.recordProductAction(actionType, user, evtLastScannedProduct).then(function (response) {
      $('#results').html('<h2>' + actionType + ' Added</h2>' + JSON.stringify(response, null, 4));
    });
  }

  function getScans() {
    'use strict';
    user.product(evtLastScannedProduct).read().then(function (product) {
      product.action('scans').read().then(function (scans) {
        console.log(scans);
        $('#results').html('<h2>Scans </h2>' + JSON.stringify(scans, null, 4));
      });
    });

  }

// return all actions for last read product based on type of action
  function getActions(actionType) {
    'use strict';
    wrapper.getProductActions(actionType, user, evtLastScannedProduct).then(function (actions) {
      $('#results').html('<h2>' + actionType + ' ' + actions.length + '</h2>' + JSON.stringify(actions, null, 4));
      if (actionType === 'Kisses') {
        $('#kissmeter').text(actions.length);
      }
    });
  }

// relocate
  function redirectToConsumerApp(location) {
    'use strict';
    window.location.replace(location);
  }

  /*
   Server Side Calls Only used here as an example
   */

  function getPlacesNearEVRYTHNG() {
    'use strict';
    getPlaces(51.508514999999996, -0.125487, 1);
  }

  function getPlaces(latitude, longitude, distance) {
    'use strict';
    EVT.api({
      url: '/places',
      params: {
        lat: latitude,
        lon: longitude,
        maxDist: distance
      },
      authorization: 'EVRYTHNGOPERATORKEY'
    }).then(function (places) {
      console.log(places);
      $('#results').html('<h2>Closest Retailers</h2>' + JSON.stringify(places, null, 4));
    });
  }

  function getAllPlaces() {
    'use strict';
    // can be filtered by Tags (eg all tescos / carrefour)
    EVT.api({
      url: '/places',
      authorization: 'EVRYTHNGOPERATORKEY'
    }).then(function (places) {
      console.log(places);
      $('#results').html('<h2>All Retailers</h2>' + JSON.stringify(places, null, 4));
    });
  }

