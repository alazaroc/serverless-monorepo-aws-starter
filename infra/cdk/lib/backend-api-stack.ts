import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'

export class BackendApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const helloFunction = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'services/example/handlers/hello.handler',
      code: lambda.Code.fromAsset('../../backend/dist'),
    })

    const api = new apigw.LambdaRestApi(this, 'HttpApi', {
      handler: helloFunction,
      proxy: true,
    })

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url ?? '',
    })
  }
}
