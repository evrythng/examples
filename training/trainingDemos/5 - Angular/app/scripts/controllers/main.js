'use strict';

/**
 * @ngdoc function
 * @name trainingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainingApp
 */
angular.module('trainingApp')
  .controller('MainCtrl', function ($scope, $location, Scanthng,storage, CampaignRedirection) {


    // number of times product scanned

    $scope.visits = storage.get('visits');

    $scope.scanBottle = function() {
        Scanthng.config({redirect: false, errorCb : scanError, successCb : scanSuccess, spinner : { auto: true }});
        Scanthng.identify();
    };

    $scope.resetVisits = function() {
        storage.clearAll();
        storage.set('visits','0');
        $scope.visits = 0;
    };

    function scanError(error) {
        // list products if you dont find them
       $location.path('/products');
       $scope.$apply();
    };

    function scanSuccess(data) {
      var redirect = CampaignRedirection.getredirectionDetails(data.evrythngId);
      $location.path(redirect.route);
      $scope.$apply();
    }
  });
