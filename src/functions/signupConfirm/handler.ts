import { formatJSONResponse } from "@libs/api-gateway";
import {
  CognitoIdentityServiceProvider
} from 'aws-sdk';

const {
  USER_POOL_CLIENT_ID,
} = process.env;

const CognitoClient = new CognitoIdentityServiceProvider();

export const main = async (event: any) => {
  console.log(event);

  const body = event.body;

  try {
    const params: CognitoIdentityServiceProvider.ConfirmSignUpRequest = {
      ClientId: USER_POOL_CLIENT_ID!,
      Username: body.email,
      ConfirmationCode: body.confirmationCode
    };

    const signupConfirmResponse = await CognitoClient.confirmSignUp(params).promise();

    return formatJSONResponse({
      signupConfirmResponse
    });

  } catch (e) {
    console.log(e);
    throw new Error('sign up confirmation error');
  }
};