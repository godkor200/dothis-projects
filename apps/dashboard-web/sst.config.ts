import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import type { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';
export default {
  config(_input) {
    return {
      name: 'dashboard-web',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {
        customDomain: {
          domainName: 'www.dothis.kr',
          hostedZone: 'dothis.kr',
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
