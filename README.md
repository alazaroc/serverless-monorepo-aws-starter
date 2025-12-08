# AWS Serverless Monorepo Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://reactjs.org/)
[![AWS CDK](https://img.shields.io/badge/AWS%20CDK-2.160-orange)](https://aws.amazon.com/cdk/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff)](https://vitejs.dev/)
[![Author](https://img.shields.io/badge/Author-Alejandro%20L%C3%A1zaro-blue)](https://playingaws.com)

A production-ready serverless monorepo starter for building modern web applications on AWS. Get your project up and running in minutes with a fully configured stack including React frontend, Lambda backend, and Infrastructure as Code.

## 📋 Table of Contents

- [AWS Serverless Monorepo Starter](#aws-serverless-monorepo-starter)
  - [📋 Table of Contents](#-table-of-contents)
  - [🎯 Why Use This Starter?](#-why-use-this-starter)
    - [Skip the Setup, Start Building](#skip-the-setup-start-building)
    - [Production-Ready Architecture](#production-ready-architecture)
    - [Perfect For](#perfect-for)
  - [🚀 Quick Start](#-quick-start)
    - [Prerequisites](#prerequisites)
    - [Get Started in 3 Steps](#get-started-in-3-steps)
  - [📦 What's Inside](#-whats-inside)
    - [Frontend (`frontend/`)](#frontend-frontend)
    - [Backend (`backend/`)](#backend-backend)
    - [Infrastructure (`infra/cdk/`)](#infrastructure-infracdk)
  - [🏗️ Architecture](#️-architecture)
  - [📁 Project Structure](#-project-structure)
  - [🛠️ Common Tasks](#️-common-tasks)
    - [Development](#development)
    - [Frontend Development](#frontend-development)
    - [Backend Development](#backend-development)
    - [Infrastructure](#infrastructure)
  - [🔧 Customization Guide](#-customization-guide)
    - [Adding a New Backend Service](#adding-a-new-backend-service)
    - [Adding AWS Resources](#adding-aws-resources)
    - [Environment Variables](#environment-variables)
  - [🧪 Testing](#-testing)
    - [Unit Tests](#unit-tests)
    - [E2E Tests](#e2e-tests)
    - [Infrastructure Tests](#infrastructure-tests)
  - [🚢 Deployment](#-deployment)
    - [Development Environment](#development-environment)
    - [Production Environment](#production-environment)
    - [CI/CD Integration](#cicd-integration)
  - [💡 Tips \& Best Practices](#-tips--best-practices)
    - [Development Workflow](#development-workflow)
    - [Cost Optimization](#cost-optimization)
    - [Security](#security)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)
  - [👤 Author](#-author)
  - [🙏 Acknowledgments](#-acknowledgments)
  - [📚 Resources](#-resources)
  - [💬 Support](#-support)

---

## 🎯 Why Use This Starter?

### Skip the Setup, Start Building

Setting up a serverless monorepo from scratch can take days. This starter gives you:

- **Pre-configured Monorepo**: npm workspaces with proper TypeScript configuration
- **Modern Frontend**: Vite + React 18 + Tailwind CSS with hot reload
- **Serverless Backend**: Domain-oriented Lambda functions ready to deploy
- **Infrastructure as Code**: AWS CDK stacks with best practices baked in
- **Testing Ready**: Vitest, Playwright, and Jest already configured
- **Code Quality**: ESLint, Prettier, and TypeScript strict mode
- **CI/CD Ready**: Structured for easy GitHub Actions or AWS CodePipeline integration

### Production-Ready Architecture

This isn't a toy project. It's built with real-world patterns:

- **Domain-Oriented Design**: Backend organized by business domains, not technical layers
- **Type Safety**: End-to-end TypeScript with shared types between frontend and backend
- **Scalable Structure**: Clear separation of concerns that grows with your team
- **AWS Best Practices**: CDK constructs following AWS Well-Architected Framework
- **Developer Experience**: Fast builds, hot reload, and instant feedback loops

### Perfect For

- Building MVPs and prototypes quickly
- Starting new serverless projects with confidence
- Learning AWS serverless architecture
- Creating internal tools and dashboards
- Hackathons and competitions
- Side projects that might scale

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- AWS CLI configured with credentials
- AWS CDK CLI: `npm install -g aws-cdk`

### Get Started in 3 Steps

1. **Clone and Install**

```bash
git clone https://github.com/alazaroc/aws-serverless-monorepo-starter.git my-project
cd my-project
npm install
```

2. **Start Development**

```bash
# Terminal 1: Start frontend dev server
cd frontend
npm run dev

# Terminal 2: Build backend (optional during development)
cd backend
npm run build
```

3. **Deploy to AWS**

```bash
# Bootstrap CDK (first time only)
cd infra/cdk
cdk bootstrap

# Deploy everything
npm run deploy
```

That's it! Your app is live on AWS.

---

## 📦 What's Inside

### Frontend (`frontend/`)

Modern React application with everything you need:

- **Vite 5**: Lightning-fast dev server and optimized builds
- **React 18**: Latest React with hooks and concurrent features
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Vitest**: Fast unit testing
- **Playwright**: E2E testing with browser automation

### Backend (`backend/`)

Serverless Lambda functions organized by domain:

- **Domain-Oriented Structure**: Organize by business logic, not tech stack
- **AWS SDK v3**: Latest AWS SDK with modular imports
- **TypeScript**: Compiled to optimized JavaScript
- **Jest**: Unit testing with mocks
- **Example Service**: Template for your own services

### Infrastructure (`infra/cdk/`)

AWS CDK for Infrastructure as Code:

- **TypeScript CDK**: Type-safe infrastructure definitions
- **Modular Stacks**: Separate stacks for frontend, backend, and shared resources
- **Best Practices**: Security, monitoring, and cost optimization built-in
- **Easy Customization**: Add DynamoDB, S3, Cognito, and more with CDK constructs

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                     CloudFront CDN                      │
│                  (Static Site Hosting)                  │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼─────┐          ┌─────▼──────┐
    │    S3    │          │ API Gateway│
    │ (React)  │          │   (REST)   │
    └──────────┘          └─────┬──────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
              ┌─────▼──────┐         ┌─────▼──────┐
              │  Lambda    │         │  Lambda    │
              │ (Service 1)│         │ (Service 2)│
              └─────┬──────┘         └─────┬──────┘
                    │                      │
              ┌─────▼──────────────────────▼─────┐
              │         DynamoDB / S3 / SES      │
              │      (Add as needed via CDK)     │
              └──────────────────────────────────┘
```

---

## 📁 Project Structure

```text
my-project/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── App.tsx       # Main component
│   │   ├── main.tsx      # Entry point
│   │   └── test/         # Test utilities
│   ├── tests/e2e/        # Playwright tests
│   └── package.json
│
├── backend/              # Lambda functions
│   ├── services/
│   │   └── example/      # Example service (template)
│   └── package.json
│
├── infra/cdk/            # AWS CDK infrastructure
│   ├── bin/              # CDK app entry
│   ├── lib/              # Stack definitions
│   └── package.json
│
└── package.json          # Root workspace config
```

---

## 🛠️ Common Tasks

### Development

```bash
# Install all dependencies
npm install

# Build all workspaces
npm run build

# Run all tests
npm run test

# Lint all code
npm run lint

# Format all code
npm run format
```

### Frontend Development

```bash
cd frontend
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
```

### Backend Development

```bash
cd backend
npm run build        # Compile TypeScript
npm run watch        # Watch mode
npm run test         # Run tests
npm run test:watch   # Watch mode for tests
```

### Infrastructure

```bash
cd infra/cdk
npm run build        # Compile CDK app
npm run synth        # Synthesize CloudFormation
npm run deploy       # Deploy all stacks
npm run diff         # Show changes
npm run destroy      # Delete all stacks
```

---

## 🔧 Customization Guide

### Adding a New Backend Service

1. Create a new service folder:

```bash
mkdir -p backend/services/my-service
```

2. Add your Lambda handler:

```typescript
// backend/services/my-service/handler.ts
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from my service!' }),
  };
};
```

3. Add it to your CDK stack:

```typescript
// infra/cdk/lib/backend-stack.ts
const myFunction = new lambda.Function(this, 'MyFunction', {
  runtime: lambda.Runtime.NODEJS_18_X,
  handler: 'services/my-service/handler.handler',
  code: lambda.Code.fromAsset('../../backend/dist'),
});
```

### Adding AWS Resources

The CDK makes it easy to add any AWS service:

```typescript
// DynamoDB Table
const table = new dynamodb.Table(this, 'MyTable', {
  partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
});

// S3 Bucket
const bucket = new s3.Bucket(this, 'MyBucket', {
  encryption: s3.BucketEncryption.S3_MANAGED,
});

// Cognito User Pool
const userPool = new cognito.UserPool(this, 'UserPool', {
  selfSignUpEnabled: true,
  signInAliases: { email: true },
});
```

### Environment Variables

Frontend (`.env.local`):

```bash
VITE_API_URL=https://your-api.execute-api.region.amazonaws.com
VITE_USER_POOL_ID=your-pool-id
VITE_CLIENT_ID=your-client-id
```

Backend (via CDK):

```typescript
const fn = new lambda.Function(this, 'Function', {
  // ...
  environment: {
    TABLE_NAME: table.tableName,
    BUCKET_NAME: bucket.bucketName,
  },
});
```

---

## 🧪 Testing

### Unit Tests

```bash
# Frontend (Vitest)
cd frontend
npm run test

# Backend (Jest)
cd backend
npm run test
```

### E2E Tests

```bash
cd frontend
npm run test:e2e        # Headless mode
npm run test:e2e:ui     # Interactive UI mode
```

### Infrastructure Tests

```bash
cd infra/cdk
npm run test            # CDK snapshot tests
```

---

## 🚢 Deployment

### Development Environment

```bash
cd infra/cdk
cdk deploy --all --context environment=dev
```

### Production Environment

```bash
cdk deploy --all --context environment=prod
```

### CI/CD Integration

The structure is ready for CI/CD. Example GitHub Actions:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - run: npm run test
      - name: Deploy to AWS
        run: |
          cd infra/cdk
          npm run deploy
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

---

## 💡 Tips & Best Practices

### Development Workflow

1. **Start with the frontend**: Build your UI first, mock the API responses
2. **Add backend services**: Implement Lambda functions as you need them
3. **Deploy incrementally**: Deploy and test each feature in AWS
4. **Use CDK outputs**: Share values between stacks (API URLs, bucket names, etc.)

### Cost Optimization

- **Lambda**: Pay only for execution time (generous free tier)
- **S3 + CloudFront**: Pennies for static hosting
- **DynamoDB**: On-demand pricing for variable workloads
- **API Gateway**: Free tier covers development and small apps

### Security

- Enable CloudFront HTTPS by default
- Use IAM roles for Lambda (never hardcode credentials)
- Enable CloudWatch Logs for debugging
- Use Cognito for authentication
- Enable AWS WAF for production apps

---

## 🤝 Contributing

Found a bug or have a suggestion? Contributions are welcome!

1. Fork the repository
1. Create a feature branch (`git checkout -b feature/amazing-feature`)
1. Commit your changes (`git commit -m 'Add amazing feature'`)
1. Push to the branch (`git push origin feature/amazing-feature`)
1. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

Created and maintained by **Alejandro Lázaro Chueca**

- Website: [playingaws.com](https://playingaws.com)
- GitHub: [@alazaroc](https://github.com/alazaroc)
- LinkedIn: [Alejandro Lázaro Chueca](https://linkedin.com/in/alejandro-lazaro-chueca)

---

## 🙏 Acknowledgments

- Built for developers who want to move fast
- Inspired by real-world serverless projects
- Powered by AWS serverless technologies

---

## 📚 Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)

---

## 💬 Support

- Open an issue for bugs or feature requests
- Visit [playingaws.com](https://playingaws.com) for tutorials and guides
- Join the AWS community discussions

---

**Ready to build something awesome?** Star this repo and start your serverless journey today! ⭐

Made with ❤️ for the AWS community by [Alejandro Lázaro Chueca](https://playingaws.com)
