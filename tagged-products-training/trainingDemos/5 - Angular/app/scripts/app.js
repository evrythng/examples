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
  .module('trainingApp',[
      'ngCookies',
      'ngRoute',
      'angularLocalStorage',
      'evrythng',
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
    // facebook app id
    //
  .config(function(EvrythngAppProvider){
      var projectKey = 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui';
      var evrythngOptions = {
          apiKey: projectKey,
          facebook: false
      };
      EvrythngAppProvider.init(evrythngOptions);
  })


  // Configure ScanThng provider here
  .config(function(ScanthngProvider){
      var projectKey = 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui';
      var scanthngOptions = {
          scanType: 'OBJPICT',
          apiKey: projectKey
      };
      ScanthngProvider.init(scanthngOptions);
  })

  .config(function($sceProvider) {
      // Completely disable SCE.  For demonstration purposes only!
      // Do not use in new projects.
      $sceProvider.enabled(false);
  });
