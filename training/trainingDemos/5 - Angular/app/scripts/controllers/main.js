'use strict';

/**
 * @ngdoc function
 * @name cokeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cokeApp
 */
angular.module('cokeApp')
  .controller('MainCtrl', function ($scope, $location, Scanthng,storage) {

        $scope.visits = storage.get('visits');

        $scope.scanBottle = function() {
            console.log('scan');
            Scanthng.config({redirect: true, errorCb : scanError});
            Scanthng.identify();
        };

        $scope.resetVisits = function() {
            console.log('reset visits');
            // reset visits
            storage.clearAll();
            storage.set('visits','0');
            $scope.visits = 0;
        };

        function scanError(error) {
           console.log('Error',error);
           $location.path('/unrecognised');
           $scope.$apply();
        }

  });
