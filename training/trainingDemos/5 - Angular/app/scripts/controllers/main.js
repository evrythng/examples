'use strict';

/**
 * @ngdoc function
 * @name trainingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainingApp
 */
angular.module('trainingApp')
  .controller('MainCtrl', function ($scope, $location, Scanthng, storage, CampaignRedirection) {
    // number of times product scanned
    $scope.visits = storage.get('visits');

    $scope.scanBottle = function() {

        Scanthng.identify({
              type: 'objpic',
              redirect: false,
              createScanAction : true,
              createAnonymousUser : true,
              spinner : { auto: true }}
        ).then(
            scanSuccess,
            scanError
        );
    };

    $scope.resetVisits = function() {
        storage.clearAll();
        storage.set('visits','0');
        $scope.visits = 0;
    };

    function scanError(error) {
        // list products if you dont find them
      console.log('Error', error);
    };

    function scanSuccess(data) {
      console.log('success', data);
    };
  });
