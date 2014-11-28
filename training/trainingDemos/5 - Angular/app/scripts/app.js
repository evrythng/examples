'use strict';

/**
 * @ngdoc overview
 * @name esteeApp
 * @description
 * # esteeApp
 *
 * Main module of the application.
 */
angular
  .module('esteeApp', [
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
      .when('/campaign/:bottleId', {
        templateUrl: 'views/Campaign.html',
        controller: 'CampaignCtrl'
      })
      .when('/loyalty/:bottleId', {
        templateUrl: 'views/loyalty.html',
        controller: 'LoyaltyCtrl'
      })
      .when('/dacebook/:bottleId', {
        templateUrl: 'views/facebook.html',
        controller: 'FacebookCtrl'
      })
      .when('/unrecognised', {
        templateUrl: 'views/unrecognised.html',
        controller: 'UnrecognisedCtrl'
      })
      .when('/unrecognised', {
        templateUrl: 'views/unrecognised.html',
        controller: 'UnrecognisedCtrl'
      })
      .when('/campaignscan', {
        templateUrl: 'views/campaignscan.html',
        controller: 'CampaignScanCtrl'
      })
      .when('/loyaltyscan', {
        templateUrl: 'views/loyaltyscan.html',
        controller: 'LoyaltyScanCtrl'
      })
      .when('/facebookscan', {
        templateUrl: 'views/facebookscan.html',
        controller: 'FacebookScanCtrl'
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
            apiKey: 'tzdcutX2sqUSPRdqWh91hu1rMSOL39lm3DhMhN5OIoiPYONfuu43fU7ZHfiXaRmNtOhKNPB4kqaAnNB2',
            facebook: true
        };

        EvrythngAppProvider.init(evrythngOptions);
    })


    // Configure ScanThng provider here
    .config(function(ScanthngProvider){
        var scanthngOptions = {
            scanType: 'OBJPICT',
            apiKey: 'tzdcutX2sqUSPRdqWh91hu1rMSOL39lm3DhMhN5OIoiPYONfuu43fU7ZHfiXaRmNtOhKNPB4kqaAnNB2'
        };

        ScanthngProvider.init(scanthngOptions);
    })
    .config(function($sceProvider) {
        // Completely disable SCE.  For demonstration purposes only!
        // Do not use in new projects.
        $sceProvider.enabled(false);
    });
