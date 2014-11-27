'use strict';
/* global ScanThng */

// Scanthng provider, wrapping Scanthng library object into an AngularJS service
angular.module('scanthng', [])
  .provider('Scanthng', function(){
    var options;

    // Public interface to this service
    return {
      // Enable to configure Scanthng in app configuration
      init: function(opt){
        options = opt;
      },

      // Provider - return Scanthng instance
      $get: function(){
        return new ScanThng(options);
      }
    };
  });