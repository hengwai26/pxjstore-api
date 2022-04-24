import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent } from "aws-lambda";

function users(event: APIGatewayProxyEvent) {
  let path: any;
  path = event.path;

  let userId = path.id;

  return formatJSONResponse({
    message: `are you looking for user ${userId}`,
    event
  });
}

export const main = middyfy(users);