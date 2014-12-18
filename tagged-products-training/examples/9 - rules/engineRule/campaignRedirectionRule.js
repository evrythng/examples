/**
 * Contour Redirect URL.
 * Created by : Dave Ashenhurst, 17 November 2014
 *
 * Checks the country and also the date range and returns a redirect URL
 *
 */
// Europe Always On Platform
var alwaysOnUrl = "http://www.cocacola.com";
// Regional always on platform
var regionalAlwaysOnUrl = [
  {'country' : 'ES',
    'redirectURL' : 'http://www.cocacola.com/es'},
  {'country' : 'IT',
    'redirectURL' : 'http://www.cocacola.com/it'},
  {'country' : 'GB',
    'redirectURL' : 'http://www.cocacola.co.uk'}
];
// Campaign Redirection Data
var redirectLocation = [
  { 'campaign' : 'Contour',
    'priority' : 1,
    'country' : 'GB',
    'startDate' : '2014/11/17',
    'endDate' : '2014/11/22' ,
    'productIds' : ['UVAdnpxbPepRQEN9gKV6AfEa'],
    'redirectURL' : 'http://www.cocacola.com/gb'},
  { 'campaign' : 'Contour',
    'priority' : 1,
    'country' : 'ES',
    'startDate' : '2014/11/17',
    'endDate' : '2014/11/28' ,
    'productIds' : ['UVAdnpxbPepRQEN9gKV6AfEa'],
    'redirectURL' : 'http://www.cocacola.com/es/contour'}
];

var ruleResponse = {};

// Campaign Redirection Function
function getRedirectLocation (searchProduct, searchCountry) {
  // set base Europe Always on
  var redirectUrl = alwaysOnUrl;
  // set regional always on URL
  var regionalSearchResult = regionalAlwaysOnUrl.filter(function(y) {
    if ((y.country === searchCountry)) {
      return y;
    }
  });

  if (regionalSearchResult.length > 0) {
    redirectUrl = regionalSearchResult[0].redirectURL;
  }
  // set regional Campaign URL
  var countrySearchResult = redirectLocation.filter(function(x) {
    // check country and products first
    if ((x.country === searchCountry) && (x.productIds.indexOf(searchProduct) >= 0 )) {
      // check dates
      var campaignStart = new Date(x.startDate);
      var campaignEnd = new Date(x.endDate);
      // add 1 day to the date to make sure the campaign runs on the end date
      campaignEnd.setDate(campaignEnd.getDate() + 1);
      var today = new Date();
      if (campaignStart < today && campaignEnd > today) {
        return x;
      }
    }
  });

  if (countrySearchResult.length > 0) {
    // if multiple returned select highest priority
    if (countrySearchResult.length === 1) {
      redirectUrl = countrySearchResult[0].redirectURL;
    }
    else {
      // find first with priority 1
      var prioritySearch = redirectLocation.filter(function(z) {
        // check country and products first
        if (z.priority === 1) {
          // check dates
            return z;
          }
      });

      if (prioritySearch.length > 0) {
        redirectUrl = prioritySearch[0].redirectUrl;
      }
      else {
        // priority search not specified
        redirectUrl = countrySearchResult[0].redirectURL
      }
    }
  }

  return redirectUrl;
}

function onActionCreated(engine,ctx) {
  if (ctx.action.type == 'scans') {
    // getRedirectLocation calculates where to go to
    ruleResponse.redirectUrl = getRedirectLocation(ctx.action.product, ctx.action.context.countryCode);
    ctx.addDataAddedReactionJS(ruleResponse);
  }
}

