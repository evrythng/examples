#Training Material

All Keys need to be updated when running samples against you EVRYTHNG instance.

var projectKey = 'EVRYTHNGPROJECTKEY';


## curl 
Sample curl requests to access the API

## examples

- ListProducts
List products on an instance
- recogniseProductImage
  Use the EVRYTHNG product recognition Service
  3 - viewProductDataAfterScan
  Get the product data after a scan
  4 - CreateAnonymousUser
  Create an anonymous user. The anonymous user is needed when a user is not asked to register. The User context
  is used to add Actions to products (like scans)
  5 - saveAnonymousUserOnDevice
  Saves the anonymous user details on the local storage, so that the user can be reused.
  6 - addAction
  Adds an Action to a Product
  7 - Filtering
  filtering the list of objects returned from the engine
  8 - facebook login
  authenticate with facebook
  9 - rules
    engineRule :
    example Campaign Redirection Rule
    mochaTests
    saves the rule to the engine and runs tests against that rule
  91 - listProductsrestNative
  nodeJS server app to list products using the NODE "request" module
  92 - updateProductRestNative
  nodeJS server app to update a product
  93 - getActionRestNative
  nodeJS server app to get the action from the API
  94 - getUserAndAddAction
  nodeJS server app to get a user and then add an action to a product

  A - Scanning Wrapper
  a sample wrapper library for user authentication, scanning, and query string parameter identification

  fullDemo
  A Full deployable demo that does scanning and redirection

## postman
  Sample Postman calls

## trainingDemos :
    1 - ListProducts
    list products
    2 - ScanProducts
    scan a product
    3 - New User
    Add a new User
    4 - UpdateFieldsAndProperties
    Update Custom fields and properties on a product
    










