# SAM Cloud Infrastructure

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. 
It includes the following files and folders:

- `functions/get-all-items` - Code for the Lambda function to get all items from a DynamoDB table.
- `functions/get-items-by-email` - Code for the Lambda function to get items by email from a DynamoDB table.
- `functions/put-item` - Code for the Lambda function to put an item into a DynamoDB table.
- `events` - Invocation events that you can use to invoke the functions.
- `template.yaml` - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions, an API Gateway API, DynamoDB tables, and more. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Deploy the Application](#deploy-the-application)
3. [Test Locally](#test-locally)
4. [Unit Tests](#unit-tests)
5. [Cleanup](#cleanup)
6. [Resources](#resources)

## Project Structure

- **Lambda Functions**:
    - `get-all-items`: Retrieves all items from the DynamoDB table.
    - `get-items-by-email`: Retrieves items by email from the DynamoDB table.
    - `put-item`: Adds a new item to the DynamoDB table.

- **API Gateway**:
    - `ItemsApi`: Manages the API endpoints for the Lambda functions.

- **DynamoDB**:
    - `ItemsTable`: Stores the items data.

- **Cognito**:
    - `CognitoUserPool`: Manages user authentication.

- **CloudFront**:
    - `CloudFrontDistribution`: Distributes the static website content.

## Deploy the Application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI 
that adds functionality for building and testing Lambda applications. 
It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. 
It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools:

- SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Node.js - [Install Node.js 16](https://nodejs.org/en/), including the NPM package management tool.
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```
## Test Locally

Build your application with the `sam build` command.

```bash
sam build
```
Test a single function by invoking it directly with a test event. 
An event is a JSON document that represents the input that the function receives from the event source.
Test events are included in the events folder in this project. 

Run functions locally and invoke them with the sam local invoke command.

```bash
sam local invoke PutItemFunction --event events/event-put-item.json
```

The SAM CLI can also emulate your application's API. Use the sam local start-api to run the API locally on port 3000.

```bash
sam local start-api
curl http://localhost:3000/
```

## Unit Tests
Tests are defined in the `functions/*/tests` directories in this project. Use the `npm test` command to run your tests.

```bash
cd functions/get-all-items
npm install
npm run test

cd ../get-items-by-email
npm install
npm run test
```

## Cleanup
To delete the sample application that you created, use the AWS CLI. 
Assuming you used your project name for the stack name, you can run the following:
````bash
sam delete --stack-name sam-cloud-infra
````

## Resources
See the [AWS SAM documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready-to-use Apps that go beyond hello 
world samples and learn how authors developed their applications: [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/)