import { formatJSONResponse } from "@libs/api-gateway";
import {
  updateUserStatus
} from '@models/user/actions';
// import { APIGatewayProxyEvent } from "aws-lambda";

export const main = async (event: any) => {
  try {

    let updateResponse = await updateUserStatus( event.path.userId, event.body.userStatus );

    return formatJSONResponse({
      updateResponse
    });

  } catch (err) {
    console.log(err);
    throw new Error('update user status failed');
  }
};

