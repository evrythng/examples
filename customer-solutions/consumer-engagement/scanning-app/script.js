// Add the evrythng-scan.js plugin to evrythng.js
EVT.use(EVT.Scan);

const TRY_AGAIN_URL = 'https://supercrunchy.cereal/scan?context=try_again';

// Create an App scope to allow limited access to EVRYTHNG data
const APPLICATION_API_KEY = '';
const app = new EVT.App(APPLICATION_API_KEY);

let anonymousUser;

app.appUser().create({
  anonymous: true
}).then((result) => {
  anonymousUser = result;
  console.log(`Created anonymous user`);
});

function onScanSuccess(response) {
  // If no results in the response
  if (!response[0].results.length) {
    // Report that the scan occurred, but that no product was found
    anonymousUser.action('_ProductNotFound').create().then(console.log);
    return;
  }
  
  // Report the first matching Thng (could also be 'product')
  const firstResult = response[0].results[0];
  console.log(`Thng: ${firstResult.thng.id}`);
  console.log(`Redirection: ${firstResult.redirections[0]}`);

  // Record the successful scan
  app.action('scans').create({ thng: firstResult.thng.id });

  // Redirect to the experience
  app.redirect(firstResult.redirections[0]);

  // Record the event
  anonymousUser.action('_RedirectionFollowed').create().then(console.log);
}

function onScanError(err) {
  // Report the scan failed to take place
  const action = {
    customFields: { message: JSON.stringify(err) }
  };

  anonymousUser.action('_ScanFailed').create(action)
    .then(console.log)
    .then(() => app.redirect(TRY_AGAIN_URL));
}

function onButtonClick() {
  // Initiate the scan
  app.scan()
    .then(onScanSuccess)
    .catch(onScanError);
}