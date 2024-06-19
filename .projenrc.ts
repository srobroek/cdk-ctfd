import { awscdk } from "projen";
const project = new awscdk.AwsCdkConstructLibrary({
  author: "Sjors Robroek",
  authorAddress: "sjors@amazon.com",
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  jsiiVersion: "~5.4.0",
  name: "cdk-ctfd-construct",
  prettier: true,
  projenrcTs: true,
  repositoryUrl: "https://github.com/sjors/cdk-ctfd-construct.git",

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
