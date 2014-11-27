'use strict';

/**
 * @ngdoc function
 * @name cokeApp.controller:ClassicscanCtrl
 * @description
 * # ClassicscanCtrl
 * Controller of the cokeApp
 */
angular.module('cokeApp')
  .controller('ClassicscanCtrl', function ($scope,Scanthng, $location) {

        $scope.scanBottle = function() {
            console.log('coke');
            Scanthng.config({redirect: false});
            Scanthng.identify();
            Scanthng.config({redirect: true});
            $location.path('/classic/UAq3c5P2sVKwfKMq7KCAggbs');
        };

    });
