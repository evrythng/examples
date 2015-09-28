// =============== FILL THE DATA IN THIS AREA ===============
var apiKey = 'INSERT YOUR OPERATOR API KEY HERE';

// UNCOMMENT ONE PARTICULAR EVENT FUNCTION YOU ARE USING
// AND FILL IT USING THE TEMPLATES
// SEE FOR DETAILS https://dashboard.evrythng.com/documentation/extended-api/reactor#debugging-local
var event =
// {
//     function: 'onActionCreated',
//     event: {
//         "action": {} //ActionDocument
//     }
// };

// {
//     function: 'onProductPropertiesChanged',
//     event: {
//         "product": {}, // ProductDocument,
//         "changes": {} // ChangesDocument
//     }
// };

// {
//     function: 'onThngPropertiesChanged',
//     event: {
//         "thng": {}, // ThngDocument
//         "changes": {} // ChangesDocument
//     }
// };
// ==========================================================

var EVT = require('evrythng-extended');

function getLogger(level) {
    return function(msg) {
        var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.log(datetime + ' [' + level + '\t]: ' + msg);
    }
}

var logger = {
    debug: getLogger('debug'),
    info: getLogger('info'),
    warn: getLogger('warn'),
    error: getLogger('error')
};

function done() {
  logger.debug('Reporting logs to EVRYTHNG...');
  logger.debug('Script finished!');
}

global.EVT = EVT;
global.app = new EVT.Operator(apiKey);
global.done = done;
global.logger = logger;

try {
    var reactor = require('./main.js');
    if (reactor[event.function]) {
        reactor[event.function](event.event);
    } else {
        console.log("There are no event functions in the reactor script to execute.");
    }
} catch (e) {
    logger.error('Could not execute reactor script: ' + e.message);
}