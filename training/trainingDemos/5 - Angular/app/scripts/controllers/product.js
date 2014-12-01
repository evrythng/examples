'use strict';

/**
 * @ngdoc function
 * @name trainingApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the trainingApp
 */
angular.module('trainingApp')
  .controller('ProductCtrl', function ($scope,$location,EvrythngApp ) {

    $scope.all = {}
    EvrythngApp.product().read().then(function(products) {
      $scope.all.products = products;
      $scope.$apply();
    });

  });
