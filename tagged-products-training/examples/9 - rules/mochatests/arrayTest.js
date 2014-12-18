/**
 * Created by dibster on 17/11/14.
 */

// Europe Always On Platform
var alwaysOnUrl = "http://www.cocacola.com";
// Regional always on platform
var regionalAlwaysOnUrl = [
  {'country' : 'ES',
    'redirectURL' : 'http://www.cocacola.com/es'},
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
    'redirectURL' : 'http://www.cocacola.com/ES/countour'}
];


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
    redirectUrl = countrySearchResult[0].redirectURL;
  }
  return redirectUrl;
}

//base URL Expected
var searchCountry = 'IT';
var searchProduct = 'UVAdnpxbPepRQEN9gKV6AfEa';
var redirectUrl = getRedirectLocation(searchProduct,searchCountry);
console.log(redirectUrl);
// spain base url expected
searchCountry = 'ES';
searchProduct = 'UVAdnpxbPepRQEfN9gKV6AdfEa';
redirectUrl = getRedirectLocation(searchProduct,searchCountry);
console.log(redirectUrl);
//contour URL expected
searchCountry = 'ES';
searchProduct = 'UVAdnpxbPepRQEN9gKV6AfEa';
redirectUrl = getRedirectLocation(searchProduct,searchCountry);
console.log(redirectUrl);
// not inside dates so expect base spain url
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
redirectLocation[1].startDate=tomorrow;
searchCountry = 'ES';
searchProduct = 'UVAdnpxbPepRQEN9gKV6AfEa';
redirectUrl = getRedirectLocation(searchProduct,searchCountry);
console.log(redirectUrl);


