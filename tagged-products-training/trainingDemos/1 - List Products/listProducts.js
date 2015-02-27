/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

  var projectKey = 'QSfS1Vw6Lz3x3LF6VE4pkFe4GyFFxUjqTnYBGQ41iCBmoPzzUinRj8m4Y2xVTQGwbxmlj9Gk382elo0N';
// Instantiate Base EVRYTHNG Object
  var app = new EVT.App(projectKey);

  function listProducts() {
    'use strict';
    app.product().read().then(function (products) {
      $(document).ready(function () {
        $('#results').append('<h2>Product</h2>' + JSON.stringify(products, null, 2));
      });
    });
  }

