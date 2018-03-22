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
const scanSuccessAction = "_ScanSuccess";
const scanFailAction = "_ScanFailed";

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
  console.log("Creating Anonymous User");
  return app
    .appUser()
    .create({ anonymous: true })
    .then(user => {
      // can save key details in local storage for subsequent visits
      localStorage.setItem("evt-user", user.id);
      localStorage.setItem("evt-user-key", user.apiKey);
      return user;
    });
};
// Registered
const namedUser = (id, pwd) => {
  console.log("Add user login here");
};
// Add Action To Platform
const addAction = (actionType, tag, msg = {}) => {
  // set action Data
  let action = {
    type: actionType,
    customFields: { message: msg },
    tags: [tag]
  };
};

const handleResponse = resp => {
  if (resp.length === 0) {
    console.log("Item not Found");
  } else {
    console.log("Result " + JSON.stringify(resp[0].results, null, 2));
    // item found add scan action
  }
};

const handleError = err => {
  console.log("Error : ");
};

const scan = () => {
  console.log("Scanning Code");
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
      console.log("response : " + JSON.stringify(response, null, 2));
      handleResponse(response);
    })
    .catch(function(err) {
      // handle error
      console.log(err);
      handleError(err);
    });
};

const error = err => {
  console.Error(err);
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
