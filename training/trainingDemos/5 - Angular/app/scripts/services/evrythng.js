'use strict';
/* global EVT */

// Evrythng provider, wrapping Evryhng library object into an AngularJS service
angular.module('evrythng', [])
  .provider('EvrythngApp', function(){
    var options;

    // Public interface to this service
    return {
      // Enable to configure EVT in app configuration
      init: function(opt){
        options = opt;
      },

      // Provider - return EVT App
      $get: function(){
        return new EVT.App(options);
      }
    };
  });