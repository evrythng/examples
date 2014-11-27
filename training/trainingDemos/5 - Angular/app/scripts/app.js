'use strict';

/**
 * @ngdoc overview
 * @name cokeApp
 * @description
 * # cokeApp
 *
 * Main module of the application.
 */
angular
  .module('cokeApp', [
    'ngCookies',
    'ngRoute',
    'evrythng',
    'angularLocalStorage',
    'angularSpinner',
    'scanthng'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/classic/:bottleId', {
        templateUrl: 'views/classic.html',
        controller: 'ClassicCtrl'
      })
      .when('/diet/:bottleId', {
        templateUrl: 'views/diet.html',
        controller: 'DietCtrl'
      })
      .when('/zero/:bottleId', {
        templateUrl: 'views/zero.html',
        controller: 'ZeroCtrl'
      })
      .when('/unrecognised', {
        templateUrl: 'views/unrecognised.html',
        controller: 'UnrecognisedCtrl'
      })
      .when('/facebook', {
        templateUrl: 'views/facebook.html',
        controller: 'FacebookCtrl'
      })
      .when('/unrecognised', {
        templateUrl: 'views/unrecognised.html',
        controller: 'UnrecognisedCtrl'
      })
      .when('/classicscan', {
        templateUrl: 'views/classicscan.html',
        controller: 'ClassicscanCtrl'
      })
      .when('/dietscan', {
        templateUrl: 'views/dietscan.html',
        controller: 'DietscanCtrl'
      })
      .when('/zeroscan', {
        templateUrl: 'views/zeroscan.html',
        controller: 'ZeroscanCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
    // Configure EVT (EvrythngJS) provider here
    // facebook false
    // facebook app id 8VAPBenT78jBSIhuG7l3ZRy18Bt1Xx0NbsWcesvdkt3xYCyja9dhQ9ZFQSJKNv4xXfSAa5xT4yO01xVP
    //
    .config(function(EvrythngAppProvider){
        var evrythngOptions = {
            apiKey: 'lAwoL9SRTFx6SJFsR6qvpqj0G8MeSL2k6m4Lq2npugZLKV07aMf0mr5V9x4kVYnuNUCIgGcLvrUMCzuU',
            facebook: true
        };

        EvrythngAppProvider.init(evrythngOptions);
    })


    // Configure ScanThng provider here
    .config(function(ScanthngProvider){
        var scanthngOptions = {
            scanType: 'OBJPICT',
            apiKey: 'lAwoL9SRTFx6SJFsR6qvpqj0G8MeSL2k6m4Lq2npugZLKV07aMf0mr5V9x4kVYnuNUCIgGcLvrUMCzuU'
        };

        ScanthngProvider.init(scanthngOptions);
    })
    .config(function($sceProvider) {
        // Completely disable SCE.  For demonstration purposes only!
        // Do not use in new projects.
        $sceProvider.enabled(false);
    });
