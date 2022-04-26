export default {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: "${self:custom.userTableName}",
    AttributeDefinitions: [
      { AttributeName: "userId", AttributeType: "S" },
      { AttributeName: "userStatus", AttributeType: "S" },
    ],
    KeySchema: [
      { AttributeName: "userId", KeyType: "HASH" }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "${self:custom.userStatusIndex}",
        KeySchema: [
          { AttributeName: "userStatus", KeyType: "HASH" }
        ],
        Projection: {
          ProjectionType: "ALL"
        }
      }
    ],
    BillingMode: "PAY_PER_REQUEST"
  }
}