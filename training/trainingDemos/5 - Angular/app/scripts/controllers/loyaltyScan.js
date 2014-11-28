'use strict';

/**
 * @ngdoc function
 * @name esteeApp.controller:DietscanCtrl
 * @description
 * # DietscanCtrl
 * Controller of the esteeApp
 */
angular.module('esteeApp')
  .controller('LoyaltyScanCtrl', function ($scope, Scanthng, $location) {
        $scope.scanBottle = function() {
            console.log('estee');
            Scanthng.config({redirect: false});
            Scanthng.identify();
            Scanthng.config({redirect: true});
            $location.path('/diet/UAq3c5P2sVKwfKMq7KCAggbs');
        };
  });
