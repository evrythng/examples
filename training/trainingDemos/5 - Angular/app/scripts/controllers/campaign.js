'use strict';

/**
 * @ngdoc function
 * @name esteeApp.controller:ClassicCtrl
 * @description
 * # ClassicCtrl
 * Controller of the esteeApp
 */
angular.module('esteeApp')
    .controller('CampaignCtrl', function ($scope, $routeParams, EvrythngApp) {

        EvrythngApp.product($routeParams.bottleId).read().then(function(product) {
            console.log(product);
            return product.action('scans').create();
        }).then(function(action){
            console.log(action);
            var reaction = action.reactions[0].text;
            var obj = JSON.parse(reaction);
            $scope.campaignName = obj.rule;
            $scope.videoUrl = obj.videoUrl;
            console.log($scope.campaignName);
            $scope.$apply();
        });


    });
