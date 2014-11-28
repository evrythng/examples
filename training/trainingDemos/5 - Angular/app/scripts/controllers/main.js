'use strict';

/**
 * @ngdoc function
 * @name esteeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the esteeApp
 */
angular.module('esteeApp')
  .controller('MainCtrl', function ($scope, $location, Scanthng,storage) {

        $scope.visits = storage.get('visits');

        $scope.scanBottle = function() {
            console.log('scan');
            Scanthng.config({redirect: true, errorCb : scanError, spinner : { auto: true }});
            var id = Scanthng.identify();
            console.log(id);
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
