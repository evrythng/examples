// Sample

//Globals

// US East Account
const evtApiUrl = "https://api.evrythng.com";
// create app withApplication API Key. Not the Trusted API Key
const evtAppKey =
  "Xi8zpcEu7oDFqxMEhOXaJ21KpkGAHdI84zqQzxzTXwtXp77LihuRyXFsCts8BXhokZx4LmhrJxTfQrzs";
let app = {};
let appUser = {};

// SET RECOGNITION TYPE HERE
const tagRecognitionMethod = "2d"; // QR Code or Data Matrix Code
// const tagRecognitionMethod = "ir"; // Logo / Image Recognition
// const tagRecognitionMethod = "1d"; // 1D barcode

// Actions
const scanSuccessAction = "_ScanFound";
const scanFailAction = "_ScanNotRecognized";

// Setup
const EVTSetup = () => {
  EVT.setup({
    apiUrl: evtApiUrl,
    geolocation: true //enable html5 geolocation services
  });
  // include evrythng scan module
  EVT.use(EVT.Scan);
  // Instantiate app Context
  app = new EVT.App(evtAppKey);
};

// log messages to console and screen
const logMsg = (msg) => {
  console.log(msg);
  $(".api-response").append($("<li class = \"list-group-item\" >" + msg + "</li>"));
}

// Users

// Anonymous
const anonUser = () => {

  logMsg("CREATE ANONYMOUS USER")
  return app
    .appUser()
    .create({
      anonymous: true
    })
    .then(user => {
      // can save key details in local storage for subsequent visits
      localStorage.setItem("evt-user", user.id);
      localStorage.setItem("evt-user-key", user.apiKey);
      logMsg(JSON.stringify(user, null, 2))
      return user;
    });
};
// Registered
const namedUser = (id, pwd) => {
  logMsg("Add user login here");
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
  logMsg(`ADDING ACTION TYPE : ${actionType}`);
  // set action Data
  let action = {
    type: actionType,
    tags: [tag]
  };

  // add product or thng to action
  if (productFound(scanResp)) {
    action.product = foundProductId(scanResp);
    logMsg("ADD ACTION TO PRODUCT");
  } else if (thngFound(scanResp)) {
    action.thng = foundThngId(scanResp);
    logMsg("ADD ACTION TO THNG");
  }
  // add the action
  return appUser
    .action(actionType)
    .create(action)
    .then(action => {
      logMsg("Action Added : " + JSON.stringify(action, null, 2));
    });
};

const handleResponse = resp => {
  if (resp.length === 0) {
    logMsg("ITEM NOT FOUND");
    // item not found, add unsuccessful Action, type of scan, and response
    addAction(scanFailAction, tagRecognitionMethod, resp);
  } else {
    logMsg("ITEM FOUND");
    // item found add scan action
    addAction(scanSuccessAction, tagRecognitionMethod, resp);
  }
};

const handleError = err => {
  logMsg("ERROR : " + JSON.stringify(err, null, 2));
};

const scan = () => {
  logMsg("START SCAN");
  // scan settings
  EVT.Scan.setup({
    filter: {
      method: tagRecognitionMethod
    }
  });
  // scan
  app
    .scan()
    .then(function (response) {
      logMsg("Scan Response : " + JSON.stringify(response, null, 2));
      handleResponse(response);
    })
    .catch(function (err) {
      // handle error
      console.error(err);
      handleError(err);
    });
};
// setup
const setUp = () => {
  // setup EVT
  EVTSetup();
  // create anonymous user
  anonUser().then(resp => {
    appUser = resp;
  });
  // show scan type on UI
  $(".recognition-type").text("Scan Type : " + tagRecognitionMethod);



};

setUp();