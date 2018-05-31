module.exports = (action) => {
  // Log the event
  logger.info(`${action.thng} > ${action.customFields.destinationCountry}`);
  
  // Update the Thng's customFields
  return app.thng(action.thng).update({ customFields: action.customFields });
};