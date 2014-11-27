'use strict';

/**
 * @ngdoc function
 * @name cokeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the cokeApp
 */
angular.module('cokeApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
