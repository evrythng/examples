"use strict";
// Operator API Key
const OPERATOR_API_KEY = "";
// API Server
const SERVER = "http://api.evrythng.com";
// Action Types JSON File
const ACTION_TYPES_FILE = require("./testdata/testActionTypes.json");
// Scope to all projects in this account by default
const SCOPE_TO_ALL = false;

// Is valid key length
const isValidKeyLength = key => {
  if (key.length != 80) {
    return false;
  }
  return true;
};

// add types
const addType = async type => {
  try {
    // add type
    const addedType = await operator.actionType().create(type);
    console.log("Added Type : " + type.name);
    // if type avaiable on ALL projects
    if (SCOPE_TO_ALL) {
      const scopedType = await operator.actionType(type.name).update({
        scopes: {
          projects: ["+all"],
          users: ["+all"]
        }
      });
      console.log("Scoped to All");
    }
    return true;
  } catch (err) {
    console.log("Error adding type : " + JSON.stringify(err));
    return false;
  }
};

//evrythng setup
const EVT = require("evrythng-extended");
operator = new EVT.Operator(OPERATOR_API_KEY);

const numberOfTypes = 0;
ACTION_TYPES_FILE.map(actiontype => {
  if (addType(actiontype)) {
    numberOfTypes++;
  }
  console.log("Number of Action Types Added : " + numberOfTypes);
});
