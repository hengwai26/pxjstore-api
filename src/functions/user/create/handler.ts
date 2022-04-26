import { formatJSONResponse } from "@libs/api-gateway";
import {
  createUser,
} from '@models/user/actions';
import { APIGatewayProxyEvent } from "aws-lambda";

export const main = async (event: APIGatewayProxyEvent) => {
  try {
    const createResponse = await createUser(event.body);

    return formatJSONResponse({
      createResponse
    });

  } catch (err) {
    console.log(err);
    throw new Error('create user failed');
  }
};

