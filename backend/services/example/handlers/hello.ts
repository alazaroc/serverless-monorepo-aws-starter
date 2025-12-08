import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { hello } from '../services/hello-service';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const name = event.queryStringParameters?.name ?? 'world';

  const message = hello(name);

  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};
