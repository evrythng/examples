// Contour Hub Sample
/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */

var operatorKey = 'viRSkcMRwCRXVVbVKa9tKdm8rVxRzhIidM1EgvDHJkqdWHtP8WtOR2xsBjHPm7izuUBGyH2T4Pzbv72K';

var app = new EVT.App(operatorKey);
var wrapper = new EvrythngCokeWrapper();

$(document).ready(function(){
  'use strict';
  var actionId = wrapper.getParameterByName('ActionId');
  console.log(actionId);
  getActionById(actionId);

});


function getActionById(id) {
  'use strict';
  EVT.api({
    url: '/actions/scans/' + id,
    params: {
      // context true returns the full location data
      context: true
    },
    authorization: operatorKey
  }).then(function(action){
    console.log('Action Just Taken',action);
    app.product(action.product).read().then(function(product) {
      console.log('Product ',product);
      var scanDate = new Date(action.createdAt).toString();
      $('#panel1').html('<h2>Product Scanned : ' + product.description + '</h2>');
      $('#productImage').attr("src", product.photos[0]);
      $('#panel2').html('<h2>Scanned at Time : ' + scanDate + ' </h2>');
      $('#panel3').html('<h2>Show Events for City : '  + action.context.city + ', ' + action.context.region + '</h2>');
      if (product.description === 'Contour Classic') {
        $('#panel4').html('<h2>Happy Me Bottle Link</h2>');
      }
      else {
        $('#panel4').html('<h2>Not a Classic Bottle</h2>');
      }
    });

  });
}


