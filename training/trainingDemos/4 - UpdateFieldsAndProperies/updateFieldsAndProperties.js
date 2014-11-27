/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

  var projectKey = 'EVRYTHNGPROJECTKEY';

// Do Not use this key for front End Work, is here as example only

  var operatorKey = 'EVRYTHNGOPERATORKEY';

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

