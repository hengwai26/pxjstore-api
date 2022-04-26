import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${ handlerPath(__dirname) }/handler.main`,
  events: [
    {
      http: {
        method: 'patch',
        path: 'user/{userId}/status',
        integration: 'lambda',
      }
    }
  ]
}