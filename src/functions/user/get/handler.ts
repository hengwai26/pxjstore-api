import { formatJSONResponse } from "@libs/api-gateway";
import {
  getUsers,
  getInactiveUsers
} from '@models/user/actions';
// import { APIGatewayProxyEvent } from "aws-lambda";

export const main = async (event: any) => {
  try {

    let getResponse = null;

    if (event.query.status) {
      getResponse = await getInactiveUsers() 
    } else {
      getResponse = await getUsers();
    }


    return formatJSONResponse({
      event,
      getResponse
    });

  } catch (err) {
    console.log(err);
    throw new Error('get users failed');
  }
};

