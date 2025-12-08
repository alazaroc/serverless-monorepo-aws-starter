import { App } from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { FrontendStack } from './frontend-stack'

test('Frontend stack creates S3 bucket and CloudFront distribution', () => {
  const app = new App()
  const stack = new FrontendStack(app, 'TestFrontendStack')
  const template = Template.fromStack(stack)

  template.resourceCountIs('AWS::S3::Bucket', 1)
  template.resourceCountIs('AWS::CloudFront::Distribution', 1)
})
