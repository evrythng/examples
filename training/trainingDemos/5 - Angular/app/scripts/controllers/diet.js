'use strict';

/**
 * @ngdoc function
 * @name cokeApp.controller:DietCtrl
 * @description
 * # DietCtrl
 * Controller of the cokeApp
 */
angular.module('cokeApp')
  .controller('DietCtrl', function ($scope, $routeParams, storage, EvrythngApp) {


        EvrythngApp.product($routeParams.bottleId).read().then(function(product) {
            console.log(product);
            return product.action('scans').create();
        }).then(function(action){
            console.log(action);

            // add storage
    //        $scope.videoUrl = '//www.youtube.com/embed/HuHV4gwSXn4?rel=0';
            var value = parseInt(storage.get('visits'));
            if (isNaN(value)) {
                value = 0;
            }
            value = value + 1;
            console.log('visits : ' + value);
            storage.set('visits',value);
            $scope.visits = value;
            $scope.message = 'Diet Coke Rewards'
            // nastiness fro demo ....
            if (value < 5) {
                $scope.imageUrl =  'images/cwrew' + value + '.png';
            }
            else {
                $scope.imageUrl =  'images/cwrew5.png';
            }

            $scope.$apply();
        });



//        if (value === 1) {
//            $scope.message = ' Well Done this is your first check in to Diet Coke';
//        }
//
//        if (value === 3) {
//            $scope.message = ' Well Done , half way there';
//        }
//
//        if (value === 5) {
//            $scope.message = 'Just One More';
//        }
//
//        if (value > 5) {
//            $scope.message = ' Brilliant you have reached your goal!';
//        }
  });
