'use strict';

/**
 * @ngdoc function
 * @name cokeApp.controller:UnrecognisedCtrl
 * @description
 * # UnrecognisedCtrl
 * Controller of the cokeApp
 */
angular.module('cokeApp')
  .controller('UnrecognisedCtrl', function ($scope,$location, Scanthng) {

        $scope.launch = function(product) {
            console.log('coke');
            Scanthng.config({redirect: false});
            Scanthng.identify();
            Scanthng.config({redirect: true});
            $location.path('/' + product + '/UAq3c5P2sVKwfKMq7KCAggbs');
        };

        $scope.redirect = function(product) {
            $location.path('/' + product + 'scan');
        };


    });
