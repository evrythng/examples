module.exports = (action) => {
  logger.info(`Sold ${action.thng}: ${JSON.stringify(action.customFields)}`);
  
  // Update the Thng's customFields to those in the action
  return app.thng(action.thng).update({ customFields: action.customFields });
};