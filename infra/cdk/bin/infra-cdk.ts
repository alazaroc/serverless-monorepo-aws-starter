#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';
import { BackendApiStack } from '../lib/backend-api-stack';

const app = new cdk.App();

const frontendStack = new FrontendStack(
  app,
  'AwsAnnouncementsHubFrontendStack',
  {}
);
const backendApiStack = new BackendApiStack(
  app,
  'AwsAnnouncementsHubBackendApiStack',
  {}
);

cdk.Tags.of(frontendStack).add('project', 'aws-announcements-hub');
cdk.Tags.of(backendApiStack).add('project', 'aws-announcements-hub');
