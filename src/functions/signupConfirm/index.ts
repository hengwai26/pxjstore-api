import { handlerPath } from "@libs/handler-resolver";

const environment = {
  USER_POOL_ID: {
      Ref: "CognitoUserPool"

  },
  USER_POOL_CLIENT_ID: "2oght8flltvgtnbv5hm0r802b7"
};

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'signupConfirm',
        integration: 'lambda',
      },
    },
  ],
  environment
};
