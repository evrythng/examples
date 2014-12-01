'use strict';

/**
 * @ngdoc function
 * @name trainingApp.controller:CampaignCtrl
 * @description
 * # CampaignCtrl
 * Controller of the trainingApp
 */
angular.module('trainingApp')
  .controller('CampaignCtrl', function ($scope, $routeParams, EvrythngApp) {
   // defaults

   $scope.videoUrl =  '//www.youtube.com/embed/443Vy3I0gJs';
   $scope.campaignName = 'Default';

   // Here we would run the rules to check the video / campaign we want to deliver , by performing a scan

//        EvrythngApp.product($routeParams.bottleId).read().then(function(product) {
//            console.log(product);
//            return product.action('scans').create();
//        }).then(function(action){
//            console.log(action);
//            var reaction = action.reactions[0].text;
//            var obj = JSON.parse(reaction);
//            $scope.campaignName = obj.rule;
//            $scope.videoUrl = obj.videoUrl;
//            console.log($scope.campaignName);
//            $scope.$apply();
//        });
  });
