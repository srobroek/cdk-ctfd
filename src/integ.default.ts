import * as cdk from "aws-cdk-lib";
import { CtfdDeployment } from "./index";
const app = new cdk.App();
const stack = new cdk.Stack(app, "CtfdDeploymentStack");
new CtfdDeployment(stack, "CtfdDeployment", {});
