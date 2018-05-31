function updateThng(thng, action) {
  // Update the Thng's destination to that in the action
  thng.customFields.destinationCountry = action.customFields.destinationCountry;

  logger.info(`Exported ${action.thng} to ${thng.customFields.destinationCountry}`);
  return thng.update();
}

module.exports = (action) => {
  // Read the Thng, then update it
  return app.thng(action.thng).read()
    .then(thng => updateThng(thng, action)); 
};