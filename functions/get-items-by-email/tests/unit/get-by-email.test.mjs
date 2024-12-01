import { getItemsByEmailHandler } from '../../app.mjs';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";
import chai from "chai";

const expect = chai.expect;
const event = {};
 
describe('Test getByIdHandler', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);
 
    beforeEach(() => {
        ddbMock.reset();
      });
 
    it('should get item by email', async () => {
        const item = {
            email: "email1@email.com",
            name: "name1",
            color: "color1",
            price: 1.00,
            product_id: "product_id1"
        };
 
        ddbMock.on(QueryCommand).resolves({
            Items: [item],
        }); 
 
        const event = { 
            httpMethod: 'GET', 
            pathParameters: { 
                email: 'email1@email.com'
            } 
        };
 
        const result = await getItemsByEmailHandler(event);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.deep.equal([item]);
    }); 
}); 
 