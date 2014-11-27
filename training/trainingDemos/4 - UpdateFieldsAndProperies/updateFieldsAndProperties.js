/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

  var projectKey = 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui';

// Do Not use this key for front End Work, is here as example only

  var operatorKey = 'I1gL9iHt3IEsn2icY6NFXreEFl3lP62HTM40neKxJrRV3Dkis3dTTmNulzZoLlBxJA1Zj0ybU1g7BVeI';

// Instantiate Base EVRYTHNG Object
  var app = new EVT.App(operatorKey);

  function updateProduct() {
    'use strict';
    var productId = 'UVAdnpxbPepRQEN9gKV6AfEa';
    app.product(productId).read().then(function (product) {
      console.log('Product', product);
      product.property('status').update('off').then(function (updatedproduct) {
      },
      function err(err) {
        console.log('update error' , err);
      });
    },
    function (err) {
      console.log('Cannot Find Product ',err);
    });
  }

