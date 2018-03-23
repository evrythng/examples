// Samples

// The is the App API Key, that is used in client Apps to authenticate a user, and have access
// to scanning Codes

//Globals

// US East Account
const evtApiUrl = "https://api.evrythng.com";
// create app withApplication API Key. Not the Trusted API Key
const evtAppKey =
  "Xi8zpcEu7oDFqxMEhOXaJ21KpkGAHdI84zqQzxzTXwtXp77LihuRyXFsCts8BXhokZx4LmhrJxTfQrzs";
let app = {};
let appUser = {};

// Recognition
const tagRecognitionMethod = "2d"; // QR Code or Data Matrix Code
// const tagRecognitionMethod = "ir"; // Logo / Image Recognition
// const tagRecognitionMethod = "1d"; // 1D barcode

// Actions
const scanSuccessAction = "_ScanFound";
const scanFailAction = "_ScanNotRecognized";

// API Responses
let apiResponses = [];

// context
const EVTSetup = () => {
  EVT.setup({
    apiUrl: evtApiUrl
  });
  // include evrythng Scan SubModule
  EVT.use(EVT.Scan);
  // Instantiate app Context
  app = new EVT.App(evtAppKey);
};

// Users

// Anonymous
const anonUser = () => {
  console.log("CREATE ANONYMOUS USER");
  return app
    .appUser()
    .create({ anonymous: true })
    .then(user => {
      // can save key details in local storage for subsequent visits
      localStorage.setItem("evt-user", user.id);
      localStorage.setItem("evt-user-key", user.apiKey);
      console.log("user : " + JSON.stringify(user, null, 2));
      return user;
    });
};
// Registered
const namedUser = (id, pwd) => {
  console.log("Add user login here");
};

// was product returned
const productFound = scanResp => {
  return scanResp[0].results[0].hasOwnProperty("product");
};
// return product id
const foundProductId = scanResp => {
  return scanResp[0].results[0].product.id;
};

// was thng returned
const thngFound = scanResp => {
  return scanResp[0].results[0].hasOwnProperty("thng");
};
// return product id
const foundThngId = scanResp => {
  return scanResp[0].results[0].thng.id;
};

// Add Action To Platform
const addAction = (actionType, tag, scanResp) => {
  // set action Data
  console.log(`ADDING ACTION TYPE : ${actionType}`);
  let action = {
    type: actionType,
    tags: [tag]
  };

  // shced response to Scan and update Action as needed

  if (productFound(scanResp)) {
    action.product = foundProductId(scanResp);
    console.log("ADD ACTION TO PRODUCT");
  } else if (thngFound(scanResp)) {
    action.thng = foundThngId(scanResp);
    console.log("ADD ACTION TO THNG");
  }
  return appUser
    .action(actionType)
    .create(action)
    .then(action => {
      console.log("Action Added : " + JSON.stringify(action, null, 2));
    });
};

const handleResponse = resp => {
  if (resp.length === 0) {
    console.log("ITEM NOT FOUND");
    // item not found, add unsuccessful Action, type of scan, and response
    addAction(scanFailAction, tagRecognitionMethod, resp);
  } else {
    console.log("ITEM FOUND");
    // item found add scan action
    addAction(scanSuccessAction, tagRecognitionMethod, resp);
  }
};

const handleError = err => {
  console.log("ERROR : " + JSON.stringify(err, null, 2));
};

const scan = () => {
  console.log("START SCAN");
  // scan settings
  EVT.Scan.setup({
    filter: {
      method: tagRecognitionMethod
    }
  });
  // scan
  app
    .scan()
    .then(function(response) {
      console.log("Scan Response : " + JSON.stringify(response, null, 2));
      handleResponse(response);
    })
    .catch(function(err) {
      // handle error
      console.error(err);
      handleError(err);
    });
};
// setup
const setUp = () => {
  // setup EVT
  EVTSetup();
  // create user
  anonUser().then(resp => {
    appUser = resp;
  });
};

setUp();
