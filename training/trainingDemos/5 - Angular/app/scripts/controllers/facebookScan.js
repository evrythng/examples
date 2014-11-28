'use strict';

/**
 * @ngdoc function
 * @name esteeApp.controller:ZeroscanCtrl
 * @description
 * # ZeroscanCtrl
 * Controller of the esteeApp
 */
angular.module('esteeApp')
  .controller('FacebookScanCtrl', function ($scope, Scanthng, $location) {
        $scope.scanBottle = function() {
            console.log('estee');
            Scanthng.config({redirect: false});
            Scanthng.identify();
            Scanthng.config({redirect: true});
            $location.path('/zero/UAq3c5P2sVKwfKMq7KCAggbs');
        };
  });
