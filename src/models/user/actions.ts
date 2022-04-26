import { DynamoDB } from 'aws-sdk';

const {
  USER_TABLE,
  USER_STATUS_INDEX
} = process.env;

const documentClient = new DynamoDB.DocumentClient();

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export interface IUser {
  userId: string;
  username: string;
  email: string;
  userStatus ?: UserStatus;
  createdAt ?: string;
}

// insert user into table
export function createUser(userdata: IUser) {
  const user: IUser = {
    ...userdata,
    userStatus: UserStatus.ACTIVE,
    createdAt: new Date().toISOString()
  };

  const params = {
    TableName: USER_TABLE!,
    Item: user
  };

  return documentClient.put(params).promise();
}

// update user status info to INACTIVE
export function updateUserStatus(userId: string, userStatus: UserStatus) {
  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: USER_TABLE!,
    Key: {
      userId
    },
    UpdateExpression: 'set #userStatus = :userStatus',
    ExpressionAttributeNames: {
      "#userStatus" : "userStatus"
    },
    ExpressionAttributeValues: {
      ":userStatus": userStatus
    } 
  };

  return documentClient.update(params).promise();
}

// forever delete a user 
export function deleteUser(userId: string) {
  const params = {
    TableName: USER_TABLE!,
    Key: {
      userId
    }
  };

  return documentClient.delete(params).promise();
}

// get all users 
export function getUsers() {
  const params = {
    TableName: USER_TABLE!,
  };

  return documentClient.scan(params).promise();
}

// get all INACTIVE users
export function getInactiveUsers() {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: USER_TABLE!,
    IndexName: USER_STATUS_INDEX,
    KeyConditionExpression: 'userStatus = :userStatus',
    ExpressionAttributeValues: {
      ":userStatus": UserStatus.INACTIVE
    }
  };

  return documentClient.query(params).promise();
}
