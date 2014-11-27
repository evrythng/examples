'use strict';

/**
 * @ngdoc function
 * @name cokeApp.controller:ZeroCtrl
 * @description
 * # ZeroCtrl
 * Controller of the cokeApp
 */
angular.module('cokeApp')
  .controller('ZeroCtrl', function ($scope, $routeParams, $location, EvrythngApp, usSpinnerService, $timeout) {


        EvrythngApp.product($routeParams.bottleId).read().then(function(product) {
            console.log(product);
            return product.action('scans').create();
        }).then(function(action){
            console.log(action);
            $scope.$apply();
        });


        $scope.faceBook = function() {
            console.log('Check In to facebook');
            usSpinnerService.spin('spinner-1');
            $timeout(function() {
                console.log('update with timeout fired');
                usSpinnerService.stop('spinner-1');
                $location.path('/facebook');
            }, 3000);


        };

  });
