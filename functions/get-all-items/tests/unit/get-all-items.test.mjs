import { getAllItemsHandler } from '../../app.mjs';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";
import chai from "chai";

const expect = chai.expect;
const event = {};


describe('Test getAllItemsHandler', () => { 
    const ddbMock = mockClient(DynamoDBDocumentClient);
 
    beforeEach(() => {
        ddbMock.reset();
      });
 
    it('should return ids', async () => { 
        const items = [{
            email: "email1@email.com",
            name: "name1",
            color: "color1",
            price: 1.00,
            product_id: "product_id1"
        },
        {
            email: "email2@email.com",
            name: "name2",
            color: "color2",
            price: 1.00,
            product_id: "product_id2"
        }];
 
        ddbMock.on(ScanCommand).resolves({
            Items: items,
        });

        const result = await getAllItemsHandler(event);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);
        console.log(response);

        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(items) 
        }; 

        expect(response).to.deep.equal(items);
    }); 
}); 
