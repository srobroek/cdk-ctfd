import { awscdk } from "projen";
import { Stability } from "projen/lib/cdk";
const cdkVersion = "2.140.0";
const project = new awscdk.AwsCdkConstructLibrary({
  author: "Sjors Robroek",
  authorAddress: "s.robroek@vxsan.com",
  cdkVersion,
  defaultReleaseBranch: "main",
  jsiiVersion: "~5.4.0",
  name: "cdk-ctfd",
  prettier: true,
  projenrcTs: true,
  repositoryUrl: "https://github.com/srobroek/cdk-ctfd-construct.git",
  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_20_X,
  },
  stability: Stability.EXPERIMENTAL,
  // publishToNuget: {
  //   dotNetNamespace: "srobroek.CdkCtfd",
  //   packageId: "srobroek.CdkCtfD",
  // },
  publishToPypi: {
    distName: "srobroek.cdk-ctfd",
    module: "cdk.ctfd",
  },
  // publishToGo: {
  //   moduleName: "github.com/srobroek/cdk-ctfd",
  // },
  devDeps: [
    "aws-sdk-client-mock",
    "aws-sdk-client-mock-jest",
    `@aws-cdk/integ-tests-alpha@^${cdkVersion}-alpha.0`,
    "cdk-nag",
  ],
  deps: ["zod"],
  bundledDeps: ["zod"],
  // deps: [
  //     "cdk-iam-floyd",
  // ],
  // bundledDeps: [
  //     "cdk-iam-floyd"
  // ],
  keywords: ["aws", "cdk", "construct", "typescript", "ctfd"],
  gitignore: [
      'cdk.out/'
  ],

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
