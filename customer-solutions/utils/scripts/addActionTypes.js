"use strict";
// Operator API Key
const OPERATOR_API_KEY = "";
// API Server
const SERVER = "http://api-eu.evrythng.com";
// Action Types JSON File
const ACTION_TYPES_FILE = require("../../supply-chain/actiontypes/gs1_supply_chain_action_types.json");
// Scope to all projects in this account by default
const SCOPE_TO_ALL = true;
//evrythng setup
const EVT = require("evrythng-extended");
EVT.setup({
  apiUrl: SERVER
});
const operator = new EVT.Operator(OPERATOR_API_KEY);

// add types
const addType = async type => {
  try {
    // add type
    const addedType = await operator.actionType().create(type);
    console.log("Added Type : " + type.name);
    // if type avaiable on ALL projects
    if (SCOPE_TO_ALL) {
      console.log("Scoping to All Projects");
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

let numberOfTypes = 0;
ACTION_TYPES_FILE.map(actiontype => {
  const resp = addType(actiontype);
});
