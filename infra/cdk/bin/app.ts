#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StorageStack } from '../lib/storage-stack';
import { AuthStack } from '../lib/auth-stack';
import { ApiStack } from '../lib/api-stack';
import { FrontendStack } from '../lib/frontend-stack';
import { ResourceNaming } from '../lib/naming';

const app = new cdk.App();
const env = app.node.tryGetContext('env') ?? 'test';
const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION;

const naming = new ResourceNaming({
  project: '{{PROJECT_NAME}}',
  environment: env,
  account,
  version: '0.1.0',
});

const stackEnv = { account, region };

const storageStack = new StorageStack(app, naming.standard('storage'), {
  env: stackEnv,
  naming,
  tags: naming.withType('backend'),
  description: 'DynamoDB tables (users, items, shares).',
});

const authStack = new AuthStack(app, naming.standard('auth'), {
  env: stackEnv,
  naming,
  tags: naming.withType('backend'),
  description: 'Amazon Cognito User Pool with mandatory TOTP MFA.',
});

const apiStack = new ApiStack(app, naming.standard('api'), {
  env: stackEnv,
  naming,
  tags: naming.withType('backend'),
  description: 'API Gateway HTTP API (v2) + ARM64 Lambdas (one handler per domain).',
});
apiStack.addDependency(storageStack);
apiStack.addDependency(authStack);

const frontendStack = new FrontendStack(app, naming.standard('frontend'), {
  env: stackEnv,
  naming,
  tags: naming.withType('frontend'),
  // To use a custom domain, pass domainName and certificateArn here (ACM in us-east-1).
  description: 'S3 bucket (static site) and CloudFront distribution with OAC.',
});
frontendStack.addDependency(apiStack);
frontendStack.addDependency(authStack);
