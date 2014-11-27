'use strict';

/**
 * @ngdoc function
 * @name cokeApp.controller:DietscanCtrl
 * @description
 * # DietscanCtrl
 * Controller of the cokeApp
 */
angular.module('cokeApp')
  .controller('DietscanCtrl', function ($scope, Scanthng, $location) {
        $scope.scanBottle = function() {
            console.log('coke');
            Scanthng.config({redirect: false});
            Scanthng.identify();
            Scanthng.config({redirect: true});
            $location.path('/diet/UAq3c5P2sVKwfKMq7KCAggbs');
        };
  });
