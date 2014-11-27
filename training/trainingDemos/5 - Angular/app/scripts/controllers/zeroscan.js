'use strict';

/**
 * @ngdoc function
 * @name cokeApp.controller:ZeroscanCtrl
 * @description
 * # ZeroscanCtrl
 * Controller of the cokeApp
 */
angular.module('cokeApp')
  .controller('ZeroscanCtrl', function ($scope, Scanthng, $location) {
        $scope.scanBottle = function() {
            console.log('coke');
            Scanthng.config({redirect: false});
            Scanthng.identify();
            Scanthng.config({redirect: true});
            $location.path('/zero/UAq3c5P2sVKwfKMq7KCAggbs');
        };
  });
