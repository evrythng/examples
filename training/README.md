#Training Material

All Keys need to be updated when running samples against you EVRYTHNG instance.
```javascript
var projectKey = 'EVRYTHNGPROJECTKEY';
```

## curl 
Sample curl requests to access the API

## examples

- ListProducts

  List products on an instance
- recogniseProductImage

  Use the EVRYTHNG product recognition Service
- viewProductDataAfterScan
  
  Get the product data after a scan
- CreateAnonymousUser

  Create an anonymous user. The anonymous user is needed when a user is not asked to register. The User context
  is used to add Actions to products (like scans)
- saveAnonymousUserOnDevice

  Saves the anonymous user details on the local storage, so that the user can be reused.
- addAction

  Adds an Action to a Product
- Filtering

  filtering the list of objects returned from the engine
- facebook login

  authenticate with facebook
- rules
  - engineRule
    
    example Campaign Redirection Rule
  - mochaTests
    
    saves the rule to the engine and runs tests against that rule
- listProductsrestNative
  
  nodeJS server app to list products using the NODE "request" module
- updateProductRestNative

  nodeJS server app to update a product
- getActionRestNative

  nodeJS server app to get the action from the API
- getUserAndAddAction

  nodeJS server app to get a user and then add an action to a product

- Scanning Wrapper

  a sample wrapper library for user authentication, scanning, and query string parameter identification.

## fullDemo
  
  A demo that does scanning and redirection
    
## final project

Template for final project

## postman
  Sample Postman calls

## trainingDemos 

These are used to show the code as part of the training course
 
- ListProducts

    list products
- ScanProducts

    scan a product
- New User

    Add a new User
- UpdateFieldsAndProperties

    Update Custom fields and properties on a product
- Angular

    An Angular JS Application










