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
  [ ] How to set partition key (HASH)?
  [ ] How to set Sort key (RANGE)?
  [ ] How to Set GSI?
  [ ] How to set GSI projections?
  [ ] How to Get Item ?
  [ ] How to Query using PK and SK ?
  [ ] How to Query on GSI ?
  [ ] How to Update a Item ?
  [ ] How to delete a Item ? 

  S3:
  [x] How to deploy a bucket ?
  [ ] How to upload an object to s3 ?
  [ ] How to fetch an object In s3 ?
  [ ] How to fetch all objects in a “folder” ?
  [ ] How to delete an object in s3?
  [ ] How to copy object from one key to another key?
  [ ] How to copy object from one bucket to another?
  [ ] How to use presigned post url for upload ?
  [ ] How to generate signed url for object ?
  [ ] How to set up trigger function for s3 onCreate?
  [ ] How to read s3 event from lambda ?
  [ ] How to get key from event?
  [ ] How to get object size from event?
