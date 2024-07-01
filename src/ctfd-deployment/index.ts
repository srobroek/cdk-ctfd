import { aws_ecs, Duration, RemovalPolicy, SecretValue } from "aws-cdk-lib";
// import {
//     AllowedMethods,
//     CachePolicy,
//     Distribution, DistributionProps,
//     OriginProtocolPolicy, OriginRequestPolicy,
//     ViewerProtocolPolicy
// } from "aws-cdk-lib/aws-cloudfront";
// import {LoadBalancerV2Origin} from "aws-cdk-lib/aws-cloudfront-origins";
import { ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  AllowedMethods,
  CachePolicy,
  Distribution,
  IDistribution,
  OriginProtocolPolicy,
  OriginRequestPolicy,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { LoadBalancerV2Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  GatewayVpcEndpointAwsService,
  IpAddresses,
  ISubnet,
  IVpc,
  Peer,
  Port,
  SecurityGroup,
  SubnetConfiguration,
  SubnetType,
  Vpc,
  VpcProps,
} from "aws-cdk-lib/aws-ec2";
import { ContainerImage, ICluster } from "aws-cdk-lib/aws-ecs";

import {
  ApplicationLoadBalancedEc2Service,
  ApplicationLoadBalancedEc2ServiceProps,
  ApplicationLoadBalancedFargateService,
  ApplicationLoadBalancedFargateServiceProps,
} from "aws-cdk-lib/aws-ecs-patterns";

import { CfnServerlessCache } from "aws-cdk-lib/aws-elasticache";
import {
  ApplicationProtocol,
  IApplicationLoadBalancer,
} from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { AnyPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import {
  AuroraMysqlEngineVersion,
  ClusterInstance,
  Credentials,
  DatabaseCluster,
  DatabaseClusterEngine,
  DatabaseClusterProps,
  IDatabaseCluster,
} from "aws-cdk-lib/aws-rds";
import { ARecord, IHostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { Bucket, IBucket } from "aws-cdk-lib/aws-s3";
import { ISecret, Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct, IValidation } from "constructs";

import { z } from "zod";

export const DeploymentPropsSchema = z
  .object({
    publicLoadBalancer: z.boolean().default(true).optional(),
    vpcSubnet: z
      .string()
      .refine(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/.test, {
        message: "Invalid CIDR range",
      })
      .optional(),
    cpu: z.number().max(16384).min(265).optional(),
    desiredCount: z.number().min(1).optional(),
    // memoryReservationMiB: z.number().optional(),
    memoryLimitMiB: z.number().min(512).max(122880).optional(),
    albDomainName: z
      .string()
      .refine(
        /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/
          .test,
        {
          message: "Invalid domain name",
        },
      )
      .optional(),
    distributionDomainName: z
      .string()
      .refine(
        /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1, 61}|[a-z0-9-]{1, 30}\.[a-z]{2, })$/
          .test,
        {
          message: "Invalid domain name",
        },
      )
      .optional(),

    createDistribution: z.boolean().optional(),
    containerImage: z.string().optional(),
    ecsMinCapacity: z.string().optional(),
    databaseName: z.string().optional(),
    dbMinCapacity: z.number().optional(),
    dbMaxCapacity: z.number().optional(),
    serverless: z.boolean().optional(),
    databaseCluster: z.any().optional(),
    redisCache: z.any().optional(),
    ecsCluster: z.any().optional(),
    vpc: z.any().optional(),
    privateSubnets: z.any().optional(),
    publicSubnets: z.any().optional(),
    loadBalancer: z.any().optional(),
    albCertificate: z.any().optional(),
    distributionCertificate: z.any().optional(),
    distributionDomainZone: z.any().optional(),
    albDomainZone: z.any().optional(),
    databaseSecret: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.databaseCluster || data.databaseSecret) {
      if (!data.databaseCluster || !data.databaseSecret) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "databaseCluster and databaseSecret are mutually inclusive properties",
          fatal: true,
        });
      }
    }

    if (data.vpc || data.ecsCluster) {
      if (!data.vpc || !data.ecsCluster) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ecsCluster and vpc are mutually inclusive properties",
          fatal: true,
        });
      }
    }
    if (data.albCertificate || data.albDomainZone || data.albDomainName) {
      if (!data.albCertificate || !data.albDomainZone || !data.albDomainName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "albCertificate, albDomainZone and albDomainName are mutually inclusive properties",
          fatal: true,
        });
      }
    }
    if (
      data.distributionDomainName ||
      data.distributionCertificate ||
      data.distributionDomainZone
    ) {
      if (
        !data.distributionDomainName ||
        !data.distributionCertificate ||
        !data.distributionDomainZone
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "distributionDomainName, distributionCertificate and distributionDomainZone are mutually inclusive properties",
          fatal: true,
        });
      }
    }
    if (data.createDistribution && !data.publicLoadBalancer) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "createDistribution requires publicLoadBalancer to be true",
        fatal: true,
      });
    }
    if (data.memoryLimitMiB && data.cpu) {
      if (data.memoryLimitMiB > data.cpu * 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "memoryLimitMiB must be less than or equal to cpu * 8",
          fatal: true,
        });
      }
      if (data.memoryLimitMiB < data.cpu * 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "memoryLimitMiB must be greater than or equal to cpu * 2",
          fatal: true,
        });
      }
      if (data.cpu <= 256 && data.memoryLimitMiB % 512 !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "memoryLimitMiB must be a multiple of 512",
          fatal: true,
        });
      }
      if (
        data.cpu > 256 &&
        data.cpu < 8192 &&
        data.memoryLimitMiB % 1024 !== 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "memoryLimitMiB must be a multiple of 1024",
          fatal: true,
        });
      }
      if (data.cpu == 8192 && data.memoryLimitMiB % 4096 !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "memoryLimitMiB must be a multiple of 4096",
          fatal: true,
        });
      }
      if (data.cpu == 16384 && data.memoryLimitMiB % 8192 !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "memoryLimitMiB must be a multiple of 8192",
          fatal: true,
        });
      }
    }
  });

export interface CtfdDeploymentProps {
  /**
   * The VPC to deploy the CTFD stack into.
   * @default - A new VPC is created.
   */

  readonly publicLoadBalancer?: boolean;
  readonly vpcSubnet?: string;

  readonly ecsCluster?: ICluster;
  readonly cpu?: number;
  readonly desiredCount?: number;
  readonly ecsMinCapacity?: number;
  readonly ecsMaxCapacity?: number;
  readonly albDomainName?: string;
  readonly albDomainZone?: IHostedZone;
  readonly albCertificate?: ICertificate;
  // readonly memoryReservationMiB?: number;
  readonly memoryLimitMiB?: number;
  readonly createDistribution?: boolean;
  readonly distributionDomainName?: string;
  readonly distributionDomainZone?: IHostedZone;
  readonly distributionCertificate?: ICertificate;
  readonly loadBalancer?: IApplicationLoadBalancer;
  readonly vpc?: IVpc;
  readonly privateSubnets?: ISubnet[];
  readonly publicSubnets?: ISubnet[];
  readonly serverless?: boolean;
  readonly databaseCluster?: IDatabaseCluster;
  readonly redisCache?: CfnServerlessCache;

  readonly containerImage?: string;
  readonly databaseName?: string;
  readonly dbMinCapacity?: number;
  readonly dbMaxCapacity?: number;
  readonly dbSecret?: ISecret;
}

// export type CtfdDeploymentInput = z.infer<typeof DeploymentPropsSchema>
export class ConstructValidator implements IValidation {
  private readonly props: CtfdDeploymentProps;
  constructor(input: CtfdDeploymentProps) {
    this.props = input;
  }

  public validate(): string[] {
    const errors: string[] = [];

    try {
      DeploymentPropsSchema.parse(this.props);
    } catch (e) {
      errors.push(JSON.stringify(e));
    }

    return errors;
  }
}

export class CtfdDeployment extends Construct {
  public ecsService:
    | ApplicationLoadBalancedEc2Service
    | ApplicationLoadBalancedFargateService;
  public distribution?: IDistribution;
  public databaseCluster: IDatabaseCluster;
  public serverlessCache: CfnServerlessCache;
  public vpc: IVpc;
  public s3Bucket: IBucket;
  public applicationLoadBalancer: IApplicationLoadBalancer;
  public cluster: ICluster;

  constructor(scope: Construct, id: string, props: CtfdDeploymentProps) {
    super(scope, id);

    const constructValidator = new ConstructValidator(props);
    this.node.addValidation(constructValidator);

    const cpu = props.cpu ?? 1024;
    const desiredCount = props.desiredCount ?? 3;
    const ecsMinCapacity = props.ecsMinCapacity ?? 3;
    const ecsMaxCapacity = props.ecsMaxCapacity ?? 5;
    // const memoryReservationMiB = props.memoryReservationMiB ?? 4096;
    const memoryLimitMiB = props.memoryLimitMiB ?? 4096;
    const publicLoadBalancer = props.publicLoadBalancer ?? true;
    const serverless = props.serverless ?? true;
    const dbMinCapacity = props.dbMinCapacity ?? 1;
    const dbMaxCapacity = props.dbMaxCapacity ?? 4;
    const containerImage = props.containerImage ?? "ctfd/ctfd:latest";
    const databaseName = props.databaseName ?? "ctfd";
    const albDomainName = props.albDomainName ?? undefined;
    const createDistribution = props.createDistribution ?? true;
    const distributionDomainName = props.distributionDomainName ?? undefined;
    const vpcSubnet = props.vpcSubnet ?? "10.0.0.0/20";

    let ecsCluster = props.ecsCluster ?? undefined;
    const albDomainZone = props.albDomainZone ?? undefined;
    const albCertificate = props.albCertificate ?? undefined;

    const distributionDomainZone = props.distributionDomainZone ?? undefined;
    const distributionCertificate = props.distributionCertificate ?? undefined;
    let loadBalancer = props.loadBalancer ?? undefined;
    let vpc = props.vpc ?? undefined;
    let privateSubnets = props.privateSubnets ?? undefined;
    let databaseCluster = props.databaseCluster ?? undefined;
    let dbSecret = props.dbSecret ?? undefined;
    let redisCache = props.redisCache ?? undefined;

    // let redisSecret = props.redisSecret ?? undefined

    this.s3Bucket = new Bucket(this, "ctfdBucket", {
      removalPolicy: RemovalPolicy.RETAIN,
      versioned: true,
      enforceSSL: true,
    });
    // VPC subnet configuration

    if (!vpc) {
      let subnetConfiguration: SubnetConfiguration[] = [];

      if (publicLoadBalancer) {
        subnetConfiguration.push({
          cidrMask: 24,
          name: "ctfd-public",
          subnetType: SubnetType.PUBLIC,
        });
        subnetConfiguration.push({
          cidrMask: 24,
          name: "ctfd-private",
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        });
      } else {
        subnetConfiguration.push({
          cidrMask: 24,
          name: "ctfd-private",
          subnetType: SubnetType.PRIVATE_ISOLATED,
        });
      }

      const vpcProps: VpcProps = {
        maxAzs: 2,
        ipAddresses: IpAddresses.cidr(vpcSubnet),
        subnetConfiguration,
        enableDnsHostnames: true,
        enableDnsSupport: true,
        natGateways: 2,
        createInternetGateway: true,
      };
      vpc = new Vpc(this, "ctfdVpc", vpcProps);
      const s3BucketAccessPoint = vpc.addGatewayEndpoint("s3Endpoint", {
        service: GatewayVpcEndpointAwsService.S3,
      });

      s3BucketAccessPoint.addToPolicy(
        new PolicyStatement({
          principals: [new AnyPrincipal()],
          actions: ["s3:*"],
          resources: [`${this.s3Bucket.bucketArn}/*`],
        }),
      );
    }

    //   const statement = new Statement.S3().allActions();
    //   statement.addResources(s3Bucket.bucketArn);
    //   statement.addAnyPrincipal();
    //   s3BucketAccessPoint.addToPolicy(statement);
    // }
    if (!privateSubnets) {
      privateSubnets = vpc.privateSubnets;
    }

    // ecs cluster configuration

    // create DB cluster if not missing

    let dbCredentials: Credentials;

    if (databaseCluster) {
      dbCredentials = Credentials.fromSecret(dbSecret!);
    } else {
      dbCredentials = Credentials.fromGeneratedSecret("ctfd");
      const dbClusterEngine = DatabaseClusterEngine.auroraMysql({
        version: AuroraMysqlEngineVersion.VER_3_06_0,
      });
      const dbClusterProps: DatabaseClusterProps = {
        engine: dbClusterEngine,
        vpc,
        credentials: dbCredentials,
        port: 3306,
        removalPolicy: RemovalPolicy.DESTROY,
        serverlessV2MaxCapacity: dbMaxCapacity,
        serverlessV2MinCapacity: dbMinCapacity,

        securityGroups: [
          new SecurityGroup(this, "dbSecurityGroup", {
            vpc,
            allowAllOutbound: false,
            description: "Allow access to the database",
          }),
        ],
        vpcSubnets: { subnets: privateSubnets },
        defaultDatabaseName: databaseName,
        writer: ClusterInstance.serverlessV2("writer", {}),
        readers: [
          ClusterInstance.serverlessV2("reader", {
            scaleWithWriter: true,
          }),
        ],
      };
      databaseCluster = new DatabaseCluster(this, "dbCluster", dbClusterProps);
    }

    if (!redisCache) {
      redisCache = new CfnServerlessCache(this, "ctfdServerlessCache", {
        engine: "redis",
        subnetIds: privateSubnets?.map((subnet) => subnet.subnetId) || [],
        securityGroupIds: [
          new SecurityGroup(this, "redisSecurityGroup", {
            vpc,
            allowAllOutbound: false,
            description: "Allow access to the redis cluster",
          }).securityGroupId,
        ],
        serverlessCacheName: "ctfdServerlessCache",
      });
    }

    // create ECS service
    let ecsService:
      | ApplicationLoadBalancedEc2Service
      | ApplicationLoadBalancedFargateService;
    let ecsServiceProps:
      | ApplicationLoadBalancedEc2ServiceProps
      | ApplicationLoadBalancedFargateServiceProps;

    // generate secrets
    const dbUser = dbCredentials.secret
      ?.secretValueFromJson("username")
      .toString();
    const dbPassword = dbCredentials.secret
      ?.secretValueFromJson("password")
      .toString();
    const databaseConnectionStringSecret = new Secret(
      this,
      "databaseConnectionStringSecret",
      {
        secretStringValue: SecretValue.unsafePlainText(
          `mysql+pymysql://${dbUser}:${dbPassword}@${databaseCluster.clusterEndpoint.hostname}/${databaseName}`,
        ),
      },
    );
    const redisConnectionStringSecret = new Secret(
      this,
      "redisConnectionStringSecret",
      {
        secretStringValue: SecretValue.unsafePlainText(
          `rediss://default:${redisCache}@${redisCache.attrEndpointAddress}:${redisCache.attrEndpointPort}`,
        ),
      },
    );

    const ctfdSecretKeySecret = new Secret(this, "ctfdSecretKeySecret", {});

    if (ecsCluster) {
    }
    ecsServiceProps = {
      cluster: ecsCluster ? ecsCluster : undefined,
      vpc: ecsCluster ? undefined : vpc,
      desiredCount,
      publicLoadBalancer: publicLoadBalancer,
      loadBalancer,
      securityGroups: [
        new SecurityGroup(this, "ctfdSecurityGroup", {
          vpc,
          allowAllOutbound: true,
        }),
      ],

      cpu,
      memoryLimitMiB,

      domainZone: albDomainZone,
      domainName: albDomainName,
      certificate: albCertificate,
      redirectHTTP: albCertificate && !createDistribution,
      openListener: !createDistribution,
      protocol: albCertificate
        ? ApplicationProtocol.HTTPS
        : ApplicationProtocol.HTTP,
      taskImageOptions: {
        image: ContainerImage.fromRegistry(containerImage as string),

        containerPort: 8080,
        secrets: {
          DATABASE_URL: aws_ecs.Secret.fromSecretsManager(
            databaseConnectionStringSecret,
          ),
          REDIS_URL: aws_ecs.Secret.fromSecretsManager(
            redisConnectionStringSecret,
          ),
          SECRET_KEY: aws_ecs.Secret.fromSecretsManager(ctfdSecretKeySecret),
        },
        environment: {
          REVERSE_PROXY: "2,2,2,2,2",
          WORKERS: (cpu / 1024 + 1).toString(),
          UPLOAD_PROVIDER: "s3",
          UPLOAD_FOLDER: "/var/uploads",
        },
      },
    };

    // };
    // const taskDefinition = ecsServiceProps.taskDefinition;
    // // taskDefinition?.addVolume(logVolume);
    // // taskDefinition?.addVolume(uploadVolume);
    // const container = taskDefinition?.defaultContainer;
    // container?.addMountPoints(
    //   {
    //     sourceVolume: "logs",
    //     containerPath: "/var/log/ctfd",
    //     readOnly: false,
    //   },
    //   {
    //     sourceVolume: "uploads",
    //     containerPath: "/var/uploads",
    //     readOnly: false,
    //   },
    // );
    if (serverless) {
      ecsService = new ApplicationLoadBalancedFargateService(
        this,
        "ctfdService",
        {
          ...ecsServiceProps,
        },
      );
    } else {
      ecsService = new ApplicationLoadBalancedEc2Service(this, "ctfdService", {
        ...ecsServiceProps,
      });
    }
    ecsService.targetGroup.configureHealthCheck({
      healthyHttpCodes: "200,301,302",
    });
    ecsService.targetGroup.enableCookieStickiness(Duration.days(1));
    const scalableTask = ecsService.service.autoScaleTaskCount({
      maxCapacity: ecsMaxCapacity,
      minCapacity: ecsMinCapacity,
    });
    scalableTask.scaleOnCpuUtilization("cpuUtilisation", {
      targetUtilizationPercent: 70,
    });
    scalableTask.scaleOnMemoryUtilization("memoryUtilisation", {
      targetUtilizationPercent: 70,
    });
    // create distribution
    const distribution = new Distribution(this, "distribution", {
      defaultBehavior: {
        origin: new LoadBalancerV2Origin(ecsService.loadBalancer, {
          protocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
        }),
        allowedMethods: AllowedMethods.ALLOW_ALL,
        cachePolicy: CachePolicy.CACHING_DISABLED,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        originRequestPolicy: OriginRequestPolicy.ALL_VIEWER,
      },
      certificate: distributionCertificate,
      enableLogging: true,
      domainNames: distributionDomainName
        ? [distributionDomainName]
        : undefined,
    });

    if (distributionDomainName && distributionDomainZone) {
      new ARecord(this, "AliasRecord", {
        zone: distributionDomainZone,
        recordName: distributionDomainName,
        target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      });
    }

    if (createDistribution && !albCertificate) {
      ecsService.loadBalancer.connections.allowFrom(
        Peer.prefixList("pl-fab65393"),
        Port.tcp(80),
        "Allow cloudfront prefix HTTP access",
      );
    } else if (createDistribution && albCertificate) {
      ecsService.loadBalancer.connections.allowFrom(
        Peer.prefixList("pl-fab65393"),
        Port.tcp(443),
        "Allow cloudfront prefix HTTPS access",
      );
    }

    databaseCluster.connections.allowFrom(
      ecsService.service,
      Port.tcp(3306),
      "Allow MySQL Access",
    );
    const redisSecurityGroup = SecurityGroup.fromSecurityGroupId(
      this,
      `redisSecurityGroupLookup`,
      redisCache.securityGroupIds![0],
    );

    redisSecurityGroup.connections.allowFrom(
      ecsService.service.connections.securityGroups[0],
      Port.tcp(6379),
      "Allow Redis access",
    );

    //set permissions

    this.s3Bucket.grantReadWrite(ecsService.taskDefinition.taskRole);
    databaseCluster.grantConnect(ecsService.taskDefinition.taskRole, dbUser!);

    // set dependencies
    ecsService.node.addDependency(databaseCluster);

    // set public properties of this construct
    this.databaseCluster = databaseCluster;
    this.vpc = vpc;
    this.serverlessCache = redisCache;
    this.applicationLoadBalancer = ecsService.loadBalancer;
    this.cluster = ecsService.cluster;
    this.ecsService = ecsService;
    this.distribution = distribution;

    // set CfnOutputs
  }
}
