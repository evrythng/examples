'use strict';

/**
 * @ngdoc overview
 * @name trainingApp
 * @description
 * # trainingApp
 *
 * Main module of the application.
 */
angular
  .module('trainingApp', [
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
      .when('/campaign/:productId', {
        templateUrl: 'views/campaign.html',
        controller: 'CampaignCtrl'
      })
      .when('/loyalty/:productId', {
        templateUrl: 'views/loyalty.html',
        controller: 'LoyaltyCtrl'
      })
      .when('/facebook/:productId', {
        templateUrl: 'views/facebook.html',
        controller: 'FacebookCtrl'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductCtrl'
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
            apiKey: 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui',
            facebook: true
        };

        EvrythngAppProvider.init(evrythngOptions);
    })


    // Configure ScanThng provider here
    .config(function(ScanthngProvider){
        var scanthngOptions = {
            scanType: 'OBJPICT',
            apiKey: 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui'
        };

        ScanthngProvider.init(scanthngOptions);
    })
    .config(function($sceProvider) {
        // Completely disable SCE.  For demonstration purposes only!
        // Do not use in new projects.
        $sceProvider.enabled(false);
    });
