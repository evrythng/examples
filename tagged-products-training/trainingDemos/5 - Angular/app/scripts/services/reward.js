'use strict';
/* global EVT */

// works out the reward level on a loyalty scheme

angular.module('trainingApp')
    .service('Reward', function() {
      var reward = {};
      this.getReward = function(productId) {
        // check the product and user and return loyalty
        reward.name = "4 items";
        reward.image = "reward4.png";
        return reward;
      };
    });