import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        integration: 'lambda',
        authorizer: {
          type: "COGNITO_USER_POOLS",
          authorizerId: {
            Ref: "ApiGatewayAuthorizer",
          },
          scopes: ['aws.cognito.signin.user.admin'],
        },
      },
    },
  ],
};
