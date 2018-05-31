function checkRegion(thng, action) {
  const newLocation = action.context.countryCode;
  logger.info(`Moved ${thng.id} to ${newLocation}`);

  // If in intended country, stop here
  if(thng.customFields.destinationCountry === newLocation) {
    logger.info('In expected region');
    return Promise.resolve();
  }

  // If not in intended country, create alert action
  logger.info('Out of region!');
  const payload = { thng: action.thng, customFields: { newLocation } };
  return app.action('_outOfRegion').create(payload)
    .then(action => logger.info(JSON.stringify(action)));
}

module.exports = (action) => {
  // Read the Thng, then check its region
  return app.thng(action.thng).read()
    .then(thng => checkRegion(thng, action));
};