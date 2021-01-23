const exampleHandler = require('../../../src/handlers/exampleHandler');

// Test Group Name
describe('Example Handler Validation', () => {
    // UNIT Item for 1 task. Please write clearly =)
    test('Bad request method. The request must to return statusCode:500', async () => {
        const event = { 
            httpMethod: 'GET', 
            body: JSON.stringify({params: {}})
        }; 
        const result = await exampleHandler.main(event, {}); 
        expect(result.statusCode).toBe(500);
    });

    test('Missing body parameter in request. The request must to return statusCode:400', async () => {
        const event = { 
            httpMethod: 'POST'
        }; 
        const result = await exampleHandler.main(event, {}); 
        expect(result.statusCode).toBe(400);
    });

    test('Expected request and input.', async () => {
        const text_helloWorld = "Hello World!"
        const event = { 
            httpMethod: 'POST', 
            body: JSON.stringify({params: {helloWorld: text_helloWorld}})
        }; 
        const result = await exampleHandler.main(event, {}); 
        const result_body = JSON.parse(result.body);
        expect(result.statusCode).toBe(200);
        expect(result_body.content.params.helloWorld).toBe(text_helloWorld);
    });
})