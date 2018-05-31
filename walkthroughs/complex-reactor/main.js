const HANDLERS = {
  _created: require('./actions/created'),
  _moved: require('./actions/moved'),
  _exported: require('./actions/exported'),
  _sold: require('./actions/sold')
};

function handleAction(action) { 
  const handler = HANDLERS[action.type];
  if(!handler) throw new Error(`No handler for action type ${action.type}`);

  return handler(action); 
}

function onActionCreated(event) {
  handleAction(event.action)
    .catch(logger.error)
    .then(done);
}

module.exports = { onActionCreated };
