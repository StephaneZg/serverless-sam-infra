import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';


const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME;

export const getItemsByEmailHandler = async (event) => {
    console.info('received:', event);
    var items;

    const emailValue = event.pathParameters.email;
    console.info('emailValue:', emailValue);

    const params = {
        TableName: tableName,
        KeyConditionExpression: '#email = :email',
        ExpressionAttributeNames: {
            '#email': 'email'
        },
        ExpressionAttributeValues: {
            ':email': emailValue
        }
    };

    try {
        const data = await ddbDocClient.send(new QueryCommand(params));
        console.info('data : ', data)
        items = data.Items;
    } catch (err) {
        console.log("Error", err);
        return {
            statusCode: 500,
            body: JSON.stringify("And error occurred")
        }
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(items)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
