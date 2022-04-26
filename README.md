## Timeline 

monday 
- write down story cases

tuesday
- setup and deployment 

wendesday - friday 
- coding + review 


## Simple Ecommerce Store

Actors:
  - Admin
  - User

Components:
  - Auth
  - Products
  - Shopping Cart
  - Checkout
  - Uploading

Storyboard:
  1. user sign up / sign in flow
      1.1 user will receive auth token after sign in / up
      1.2 unauthenticated user will redirect to sign in
      1.3 user able to reset password  

  2. ordering flow 
    - user view list of products 
    - user select products and add to cart 
    - user need to upload receipt during checkout
    - user able to cancel products in shoppng carts
    - upon user upload receipt, admin will get notify and able to view receipt and approve it

  3. Products 
    - admin able to add, update, delete products 
    - admin able to upload products photo 
    - admin able to update prodcuts pricing

## Checklist

  [x] How to set serverless stack name?

  [x] How to deploy a serverless project?
      - serverless deploy

  [x] How to deploy just a single serverless function?
      - serverless deploy function --function [functionName]

  [x] How to get path parameters from event?
  [x] How to get query parameter from event?
  [x] How to set path for api request?
  [x] How to set post method for api request?
  [x] How to set path with path parameter?
  [x] How to get request body from event?
  [x] How to set up api gateway?
  [x] How to set up a basic lambda function?
  [x] How to use lambda integration?

  Cognito
  [x] How to set up cognito?
  [x] How to secure api gateway with cognito?
  [x] How to set cognito as an authorizer?
  [x] How to get identity from event?
  [x] How to sign up user?
  [x] How to delete user?
  [x] How to confirm user sign up ?
  [x] How to reset user forget password?
  [x] How to refresh token?

  DynamoDB
  [x] How to set partition key (HASH)?
    - refer to cloud formation:
      - Properties.keySchema: [ { AttributeName, KeyType: 'HASH' } ]

  [x] How to set Sort key (RANGE)?
    - refer to cloud formation:
      - Properties.keySchema: [ { AttributeName, keyType: 'RANGE' } ]

  [x] How to Set GSI?
    - refer to cloud formation:
      - Properties.GlobalSecondaryIndexes: [ { IndexName, KeySchema, Projection: { ProjectionType } } ]

  [x] How to set GSI projections ?
    - refer to cloud formation:
      - Properties.GlobalSecondaryIndexes: [ { IndexName, KeySchema, Projection: { ProjectionType } } ]

  [x] What is GSI Projections ?
    - projection of others attributes when using GSI

  [x] How to Create Item ?
  [x] How to Get Item ?
  [x] How to Query using PK and SK ?
  [x] How to Query on GSI ?
  [x] How to Update a Item ?
  [x] How to delete a Item ? 

  S3:
  [x] How to deploy a bucket ?
    - refer to cloud formation template.

  [x] How to upload an object to s3 ?
    - refer to aws-sdk/s3 client side.
    - use s3.putObject method.
    - if frontend unable to use aws-sdk. backend prepare api endpoint to accept object as buffer then upload to s3.

  [x] How to fetch an object In s3 ?
    - use s3.getObject

  [x] How to fetch all objects in a “folder” ?
    - use s3.listObject
    - remember to include "folder path" inside your key.

  [x] How to delete an object in s3?
    - s3.deleteObjects

  [x] How to copy object from one key to another key?
    - use s3.copyObject

  [x] How to copy object from one bucket to another?
    - use s3.copyObject. provide copy source and key.
  
  [x] How to use presigned post url for upload ?
    - s3.createPresignedPost (need to look more into this)
  
  [x] How to generate signed url for object ?
    - s3.getSignedUrl
    - s3.getSignedUrlPromise
  
  [x] How to set up trigger function for s3 onCreate?
    - setup inside serverless function
    - under events, regiester s3 object and set event to s3:ObjectCreated:*
  
  [x] How to read s3 event from lambda ?
    - Records attribute will append inside event object
  
  [x] How to get key from event?
    - event.Records[0].s3.object.key
  
  [x] How to get object size from event?
    - event.Records[0].s3.object.size
