// Import putItemHandler function from put-item.mjs 
import { putItemHandler } from '../../app.mjs';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";
import chai from "chai";

const expect = chai.expect;

const event = {
    httpMethod: 'POST',
    body: '{"email": "email@email.com","name": "name1", "color": "color1", "price": 1.00}'
};

describe('Test putItemHandler', function () { 
    const ddbMock = mockClient(DynamoDBDocumentClient);
 
    beforeEach(() => {
        ddbMock.reset();
      });
 
    it('should add id to the table', async () => {
        const returnedItem = {
            email: "email@email.com",
            name: "name1",
            color: "color1",
            price: 1.00
        };
 
        ddbMock.on(PutCommand).resolves({
            returnedItem
        }); 
 
        const event = { 
            httpMethod: 'POST', 
            body: '{"id": "id1","name": "name1"}' 
        }; 
     
        const result = await putItemHandler(event);
        
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(returnedItem) 
        };

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');

    }); 
}); 
 