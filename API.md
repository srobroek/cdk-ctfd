# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CtfdDeployment <a name="CtfdDeployment" id="cdk-ctfd.CtfdDeployment"></a>

#### Initializers <a name="Initializers" id="cdk-ctfd.CtfdDeployment.Initializer"></a>

```typescript
import { CtfdDeployment } from 'cdk-ctfd'

new CtfdDeployment(scope: Construct, id: string, props: CtfdDeploymentProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ctfd.CtfdDeployment.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeployment.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeployment.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-ctfd.CtfdDeploymentProps">CtfdDeploymentProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-ctfd.CtfdDeployment.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-ctfd.CtfdDeployment.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-ctfd.CtfdDeployment.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-ctfd.CtfdDeploymentProps">CtfdDeploymentProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-ctfd.CtfdDeployment.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-ctfd.CtfdDeployment.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-ctfd.CtfdDeployment.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-ctfd.CtfdDeployment.isConstruct"></a>

```typescript
import { CtfdDeployment } from 'cdk-ctfd'

CtfdDeployment.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-ctfd.CtfdDeployment.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ctfd.CtfdDeployment.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-ctfd.CtfdDeployment.property.applicationLoadBalancer">applicationLoadBalancer</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.IApplicationLoadBalancer</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeployment.property.cluster">cluster</a></code> | <code>aws-cdk-lib.aws_ecs.ICluster</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeployment.property.databaseCluster">databaseCluster</a></code> | <code>aws-cdk-lib.aws_rds.IDatabaseCluster</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeployment.property.ecsService">ecsService</a></code> | <code>aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedEc2Service \| aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedFargateService</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeployment.property.s3Bucket">s3Bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeployment.property.serverlessCache">serverlessCache</a></code> | <code>aws-cdk-lib.aws_elasticache.CfnServerlessCache</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeployment.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeployment.property.distribution">distribution</a></code> | <code>aws-cdk-lib.aws_cloudfront.IDistribution</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-ctfd.CtfdDeployment.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `applicationLoadBalancer`<sup>Required</sup> <a name="applicationLoadBalancer" id="cdk-ctfd.CtfdDeployment.property.applicationLoadBalancer"></a>

```typescript
public readonly applicationLoadBalancer: IApplicationLoadBalancer;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.IApplicationLoadBalancer

---

##### `cluster`<sup>Required</sup> <a name="cluster" id="cdk-ctfd.CtfdDeployment.property.cluster"></a>

```typescript
public readonly cluster: ICluster;
```

- *Type:* aws-cdk-lib.aws_ecs.ICluster

---

##### `databaseCluster`<sup>Required</sup> <a name="databaseCluster" id="cdk-ctfd.CtfdDeployment.property.databaseCluster"></a>

```typescript
public readonly databaseCluster: IDatabaseCluster;
```

- *Type:* aws-cdk-lib.aws_rds.IDatabaseCluster

---

##### `ecsService`<sup>Required</sup> <a name="ecsService" id="cdk-ctfd.CtfdDeployment.property.ecsService"></a>

```typescript
public readonly ecsService: ApplicationLoadBalancedEc2Service | ApplicationLoadBalancedFargateService;
```

- *Type:* aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedEc2Service | aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedFargateService

---

##### `s3Bucket`<sup>Required</sup> <a name="s3Bucket" id="cdk-ctfd.CtfdDeployment.property.s3Bucket"></a>

```typescript
public readonly s3Bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

---

##### `serverlessCache`<sup>Required</sup> <a name="serverlessCache" id="cdk-ctfd.CtfdDeployment.property.serverlessCache"></a>

```typescript
public readonly serverlessCache: CfnServerlessCache;
```

- *Type:* aws-cdk-lib.aws_elasticache.CfnServerlessCache

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-ctfd.CtfdDeployment.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `distribution`<sup>Optional</sup> <a name="distribution" id="cdk-ctfd.CtfdDeployment.property.distribution"></a>

```typescript
public readonly distribution: IDistribution;
```

- *Type:* aws-cdk-lib.aws_cloudfront.IDistribution

---


## Structs <a name="Structs" id="Structs"></a>

### CtfdDeploymentProps <a name="CtfdDeploymentProps" id="cdk-ctfd.CtfdDeploymentProps"></a>

#### Initializer <a name="Initializer" id="cdk-ctfd.CtfdDeploymentProps.Initializer"></a>

```typescript
import { CtfdDeploymentProps } from 'cdk-ctfd'

const ctfdDeploymentProps: CtfdDeploymentProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.albCertificate">albCertificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.albDomainName">albDomainName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.albDomainZone">albDomainZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.containerImage">containerImage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.cpu">cpu</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.createDistribution">createDistribution</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.databaseCluster">databaseCluster</a></code> | <code>aws-cdk-lib.aws_rds.IDatabaseCluster</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.databaseName">databaseName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.dbMaxCapacity">dbMaxCapacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.dbMinCapacity">dbMinCapacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.dbSecret">dbSecret</a></code> | <code>aws-cdk-lib.aws_secretsmanager.ISecret</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.desiredCount">desiredCount</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.distributionCertificate">distributionCertificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.distributionDomainName">distributionDomainName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.distributionDomainZone">distributionDomainZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.ecsCluster">ecsCluster</a></code> | <code>aws-cdk-lib.aws_ecs.ICluster</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.ecsMaxCapacity">ecsMaxCapacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.ecsMinCapacity">ecsMinCapacity</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.loadBalancer">loadBalancer</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.IApplicationLoadBalancer</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.memoryLimitMiB">memoryLimitMiB</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.privateSubnets">privateSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet[]</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.publicLoadBalancer">publicLoadBalancer</a></code> | <code>boolean</code> | The VPC to deploy the CTFD stack into. |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.publicSubnets">publicSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.ISubnet[]</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.redisCache">redisCache</a></code> | <code>aws-cdk-lib.aws_elasticache.CfnServerlessCache</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.serverless">serverless</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |
| <code><a href="#cdk-ctfd.CtfdDeploymentProps.property.vpcSubnet">vpcSubnet</a></code> | <code>string</code> | *No description.* |

---

##### `albCertificate`<sup>Optional</sup> <a name="albCertificate" id="cdk-ctfd.CtfdDeploymentProps.property.albCertificate"></a>

```typescript
public readonly albCertificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

---

##### `albDomainName`<sup>Optional</sup> <a name="albDomainName" id="cdk-ctfd.CtfdDeploymentProps.property.albDomainName"></a>

```typescript
public readonly albDomainName: string;
```

- *Type:* string

---

##### `albDomainZone`<sup>Optional</sup> <a name="albDomainZone" id="cdk-ctfd.CtfdDeploymentProps.property.albDomainZone"></a>

```typescript
public readonly albDomainZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---

##### `containerImage`<sup>Optional</sup> <a name="containerImage" id="cdk-ctfd.CtfdDeploymentProps.property.containerImage"></a>

```typescript
public readonly containerImage: string;
```

- *Type:* string

---

##### `cpu`<sup>Optional</sup> <a name="cpu" id="cdk-ctfd.CtfdDeploymentProps.property.cpu"></a>

```typescript
public readonly cpu: number;
```

- *Type:* number

---

##### `createDistribution`<sup>Optional</sup> <a name="createDistribution" id="cdk-ctfd.CtfdDeploymentProps.property.createDistribution"></a>

```typescript
public readonly createDistribution: boolean;
```

- *Type:* boolean

---

##### `databaseCluster`<sup>Optional</sup> <a name="databaseCluster" id="cdk-ctfd.CtfdDeploymentProps.property.databaseCluster"></a>

```typescript
public readonly databaseCluster: IDatabaseCluster;
```

- *Type:* aws-cdk-lib.aws_rds.IDatabaseCluster

---

##### `databaseName`<sup>Optional</sup> <a name="databaseName" id="cdk-ctfd.CtfdDeploymentProps.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

---

##### `dbMaxCapacity`<sup>Optional</sup> <a name="dbMaxCapacity" id="cdk-ctfd.CtfdDeploymentProps.property.dbMaxCapacity"></a>

```typescript
public readonly dbMaxCapacity: number;
```

- *Type:* number

---

##### `dbMinCapacity`<sup>Optional</sup> <a name="dbMinCapacity" id="cdk-ctfd.CtfdDeploymentProps.property.dbMinCapacity"></a>

```typescript
public readonly dbMinCapacity: number;
```

- *Type:* number

---

##### `dbSecret`<sup>Optional</sup> <a name="dbSecret" id="cdk-ctfd.CtfdDeploymentProps.property.dbSecret"></a>

```typescript
public readonly dbSecret: ISecret;
```

- *Type:* aws-cdk-lib.aws_secretsmanager.ISecret

---

##### `desiredCount`<sup>Optional</sup> <a name="desiredCount" id="cdk-ctfd.CtfdDeploymentProps.property.desiredCount"></a>

```typescript
public readonly desiredCount: number;
```

- *Type:* number

---

##### `distributionCertificate`<sup>Optional</sup> <a name="distributionCertificate" id="cdk-ctfd.CtfdDeploymentProps.property.distributionCertificate"></a>

```typescript
public readonly distributionCertificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

---

##### `distributionDomainName`<sup>Optional</sup> <a name="distributionDomainName" id="cdk-ctfd.CtfdDeploymentProps.property.distributionDomainName"></a>

```typescript
public readonly distributionDomainName: string;
```

- *Type:* string

---

##### `distributionDomainZone`<sup>Optional</sup> <a name="distributionDomainZone" id="cdk-ctfd.CtfdDeploymentProps.property.distributionDomainZone"></a>

```typescript
public readonly distributionDomainZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---

##### `ecsCluster`<sup>Optional</sup> <a name="ecsCluster" id="cdk-ctfd.CtfdDeploymentProps.property.ecsCluster"></a>

```typescript
public readonly ecsCluster: ICluster;
```

- *Type:* aws-cdk-lib.aws_ecs.ICluster

---

##### `ecsMaxCapacity`<sup>Optional</sup> <a name="ecsMaxCapacity" id="cdk-ctfd.CtfdDeploymentProps.property.ecsMaxCapacity"></a>

```typescript
public readonly ecsMaxCapacity: number;
```

- *Type:* number

---

##### `ecsMinCapacity`<sup>Optional</sup> <a name="ecsMinCapacity" id="cdk-ctfd.CtfdDeploymentProps.property.ecsMinCapacity"></a>

```typescript
public readonly ecsMinCapacity: number;
```

- *Type:* number

---

##### `loadBalancer`<sup>Optional</sup> <a name="loadBalancer" id="cdk-ctfd.CtfdDeploymentProps.property.loadBalancer"></a>

```typescript
public readonly loadBalancer: IApplicationLoadBalancer;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.IApplicationLoadBalancer

---

##### `memoryLimitMiB`<sup>Optional</sup> <a name="memoryLimitMiB" id="cdk-ctfd.CtfdDeploymentProps.property.memoryLimitMiB"></a>

```typescript
public readonly memoryLimitMiB: number;
```

- *Type:* number

---

##### `privateSubnets`<sup>Optional</sup> <a name="privateSubnets" id="cdk-ctfd.CtfdDeploymentProps.property.privateSubnets"></a>

```typescript
public readonly privateSubnets: ISubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet[]

---

##### `publicLoadBalancer`<sup>Optional</sup> <a name="publicLoadBalancer" id="cdk-ctfd.CtfdDeploymentProps.property.publicLoadBalancer"></a>

```typescript
public readonly publicLoadBalancer: boolean;
```

- *Type:* boolean
- *Default:* A new VPC is created.

The VPC to deploy the CTFD stack into.

---

##### `publicSubnets`<sup>Optional</sup> <a name="publicSubnets" id="cdk-ctfd.CtfdDeploymentProps.property.publicSubnets"></a>

```typescript
public readonly publicSubnets: ISubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISubnet[]

---

##### `redisCache`<sup>Optional</sup> <a name="redisCache" id="cdk-ctfd.CtfdDeploymentProps.property.redisCache"></a>

```typescript
public readonly redisCache: CfnServerlessCache;
```

- *Type:* aws-cdk-lib.aws_elasticache.CfnServerlessCache

---

##### `serverless`<sup>Optional</sup> <a name="serverless" id="cdk-ctfd.CtfdDeploymentProps.property.serverless"></a>

```typescript
public readonly serverless: boolean;
```

- *Type:* boolean

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="cdk-ctfd.CtfdDeploymentProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---

##### `vpcSubnet`<sup>Optional</sup> <a name="vpcSubnet" id="cdk-ctfd.CtfdDeploymentProps.property.vpcSubnet"></a>

```typescript
public readonly vpcSubnet: string;
```

- *Type:* string

---

## Classes <a name="Classes" id="Classes"></a>

### ConstructValidator <a name="ConstructValidator" id="cdk-ctfd.ConstructValidator"></a>

- *Implements:* constructs.IValidation

#### Initializers <a name="Initializers" id="cdk-ctfd.ConstructValidator.Initializer"></a>

```typescript
import { ConstructValidator } from 'cdk-ctfd'

new ConstructValidator(input: CtfdDeploymentProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ctfd.ConstructValidator.Initializer.parameter.input">input</a></code> | <code><a href="#cdk-ctfd.CtfdDeploymentProps">CtfdDeploymentProps</a></code> | *No description.* |

---

##### `input`<sup>Required</sup> <a name="input" id="cdk-ctfd.ConstructValidator.Initializer.parameter.input"></a>

- *Type:* <a href="#cdk-ctfd.CtfdDeploymentProps">CtfdDeploymentProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-ctfd.ConstructValidator.validate">validate</a></code> | Validate the current construct. |

---

##### `validate` <a name="validate" id="cdk-ctfd.ConstructValidator.validate"></a>

```typescript
public validate(): string[]
```

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.
Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.





