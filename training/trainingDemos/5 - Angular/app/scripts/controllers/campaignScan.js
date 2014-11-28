'use strict';

/**
 * @ngdoc function
 * @name esteeApp.controller:ClassicscanCtrl
 * @description
 * # ClassicscanCtrl
 * Controller of the esteeApp
 */
angular.module('esteeApp')
  .controller('CampaignScanCtrl', function ($scope,Scanthng, $location) {

        $scope.scanBottle = function() {
            console.log('estee');
            Scanthng.config({redirect: false});
            Scanthng.identify();
            Scanthng.config({redirect: true});
            $location.path('/classic/UAq3c5P2sVKwfKMq7KCAggbs');
        };

    });
