import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import {
  CognitoIdentityServiceProvider
} from 'aws-sdk';

const {
  USER_POOL_CLIENT_ID,
} = process.env;

const CognitoClient = new CognitoIdentityServiceProvider();

export const main = async (event: any) => {
  const body = event.body;

  try {
    const params: CognitoIdentityServiceProvider.SignUpRequest = {
      ClientId: USER_POOL_CLIENT_ID!,
      Username: body.email,
      Password: body.password
    };

    const signupResponse = await CognitoClient.signUp(params).promise();

    return formatJSONResponse({
      signupResponse
    });

  } catch (e) {
    console.log(e);
    throw new Error('sign up error');
  }
};