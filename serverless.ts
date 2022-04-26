import type { AWS } from '@serverless/typescript';

import {
  hello,
  users,
  signup,
  signupConfirm,
  signin
} from "./src/functions";

import {
  userTable
} from "./src/models";

const serverlessConfiguration: AWS = {
  service: 'pxjstore-api',
  frameworkVersion: '3',
  plugins: ['serverless-offline', 'serverless-esbuild', "serverless-prune-plugin"],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "ap-southeast-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      S3_BUCKET: "${self:custom.bucketName}",
      USER_TABLE: "${self:custom.userTableName}",
      USER_STATUS_INDEX: "${self:custom.userStatusIndex}",
    },
    apiName: "${self:custom.generalName}",
    stage: "dev",
    lambdaHashingVersion: "20201221",
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:*", "ses:*", "iam:*", "cognito-idp:*", "route53:*"],
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: [
              "s3:*"
            ],
            Resource: [
              "arn:aws:s3:::${self:custom.bucketName}/*",
            ],
          },
        ]
      }
    }
  },
  functions: { 
    hello,
    users,
    signup,
    signupConfirm,
    signin
  },
  package: { 
    individually: true 
  },
  custom: {
    generalName: "${self:service}-${self:provider.stage}",
    bucketName: "pxjstore-s3-${self:provider.stage}",
    userTableName: "pxjstore-user-${self:provider.stage}",
    userStatusIndex: "userStatus-index",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {

      CognitoUserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          UserPoolName: "${self:custom.generalName}",
          UsernameAttributes: ["email"],
          AutoVerifiedAttributes: ["email"],
        },
      },

      CognitoUserPoolClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
          ClientName: "${self:custom.generalName}",
          UserPoolId: {
            Ref: "CognitoUserPool",
          },
          ExplicitAuthFlows: ["ADMIN_NO_SRP_AUTH"],
          GenerateSecret: false,
          AccessTokenValidity: 1,
          RefreshTokenValidity: 365,
          TokenValidityUnits: {
            "AccessToken": "days",
            "RefreshToken": "days"
          }
        },
      },

      ApiGatewayAuthorizer: {
        Type: "AWS::ApiGateway::Authorizer",
        DependsOn: ["ApiGatewayRestApi"],
        Properties: {
          Name: "${self:custom.generalName}",
          IdentitySource: "method.request.header.Authorization",
          RestApiId: {
            Ref: "ApiGatewayRestApi",
          },
          Type: "COGNITO_USER_POOLS",
          ProviderARNs: [{ "Fn::GetAtt": ["CognitoUserPool", "Arn"] }],
        },
      },

      GatewayResponseUNAUTHORIZED: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
          },
          ResponseType: "UNAUTHORIZED",
          RestApiId: {
            Ref: "ApiGatewayRestApi",
          },
          StatusCode: "401",
          ResponseTemplates: {
            "application/json":
              '{ "statusCode":401, "errors":[ { "code":"unauthorized", "message":$context.error.messageString, "recovery":"Please re-authenticate" } ] }',
          },
        },
      },

      PxjstoreS3Bucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "${self:custom.bucketName}",
        },
      },

      userTable

    },
  }
};

module.exports = serverlessConfiguration;
