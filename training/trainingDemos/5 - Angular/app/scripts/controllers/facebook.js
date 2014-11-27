'use strict';

/**
 * @ngdoc function
 * @name cokeApp.controller:FacebookCtrl
 * @description
 * # FacebookCtrl
 * Controller of the cokeApp
 */
angular.module('cokeApp')
  .controller('FacebookCtrl', function ($scope, usSpinnerService) {
     $scope.page = 'facebook';
     console.log('In Facebook Page');
  });
