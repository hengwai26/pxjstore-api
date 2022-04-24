import { formatJSONResponse } from "@libs/api-gateway";
import {
  CognitoIdentityServiceProvider
} from 'aws-sdk';

const {
  USER_POOL_CLIENT_ID,
  USER_POOL_ID
} = process.env;

const CognitoClient = new CognitoIdentityServiceProvider();

export const main = async (event: any) => {
  const body = event.body;

  try {
    const params: CognitoIdentityServiceProvider.AdminInitiateAuthRequest = {
      ClientId: USER_POOL_CLIENT_ID!,
      UserPoolId: USER_POOL_ID!,
      AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: body.email,
        PASSWORD: body.password
      }
    };

    const response = await CognitoClient.adminInitiateAuth(params).promise();

    return formatJSONResponse({
      accessToken: response.AuthenticationResult!.AccessToken!,
      refreshToken: response.AuthenticationResult!.RefreshToken!
    });

  } catch (e) {
    console.log(e);
    throw new Error('sign in error');
  }
};