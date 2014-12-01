'use strict';
/* global EVT */

// Evrythng provider, wrapping Evryhng library object into an AngularJS service
angular.module('trainingApp')
    .service('CampaignRedirection', function() {
      this.getredirectionDetails = function(productId) {
        var redirectionData = {};
        redirectionData.route = 'campaign' + productId;
        redirectionData.media = {};
        redirectionData.media.videoURL = 'this is the video URL'
        return redirectionData;
      };
    });