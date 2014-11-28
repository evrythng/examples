'use strict';

/**
 * @ngdoc function
 * @name esteeApp.controller:UnrecognisedCtrl
 * @description
 * # UnrecognisedCtrl
 * Controller of the esteeApp
 */
angular.module('esteeApp')
  .controller('UnrecognisedCtrl', function ($scope,$location,EvrythngApp ) {

    $scope.all = {}
    EvrythngApp.product().read().then(function(products) {
      console.log(products);
      $scope.all.products = products;
      $scope.$apply();
    });

  });
