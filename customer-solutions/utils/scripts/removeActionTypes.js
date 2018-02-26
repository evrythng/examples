"use strict";
// Operator API Key
const OPERATOR_API_KEY = "";
// API Server
const SERVER = "http://api-eu.evrythng.com";
// Action Types JSON File
const ACTION_TYPES_FILE = require("../../supply-chain/actiontypes/gs1_supply_chain_action_types.json");
// Scope to all projects in this account by default
const SCOPE_TO_ALL = true;
// ask for confirmation
const readline = require("readline");
var rl = readline.createInterface(process.stdin, process.stdout);
//evrythng setup
const EVT = require("evrythng-extended");
EVT.setup({
  apiUrl: SERVER
});
const operator = new EVT.Operator(OPERATOR_API_KEY);

async function warningMessage() {
  console.log("");
  console.log(
    "\x1b[36m%s\x1b[0m",
    "WARNING : This will remove types and ALL associated actions"
  );
  console.log("");
}

// remove types
const removeType = async type => {
  try {
    const addedType = await operator.actionType(type.name).delete();
    console.log("Removed Type : " + type.name);
    return true;
  } catch (err) {
    console.log("Error Removing type : " + JSON.stringify(err));
    return false;
  }
};

warningMessage();

rl.question(`Remove ${ACTION_TYPES_FILE.length} actions (yes / no) `, function(
  answer
) {
  if (answer.toLowerCase() == "yes") {
    ACTION_TYPES_FILE.map(actiontype => {
      const resp = removeType(actiontype);
    });
    rl.close();
  } else {
    console.log("Cancelled");
    process.exit(1);
  }
});
