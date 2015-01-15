/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

  var projectKey = 'KgfsWUbXUKsTbp3EmBsWIGzrNNd7SpoleNVfCf4nc4Bh9p82AuA8SYAi1IlCwsntuk1UKc023TAYT3aL';
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

