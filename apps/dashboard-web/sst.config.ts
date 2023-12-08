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
      const prodSite = new NextjsSite(stack, 'prodSite', {
        customDomain: {
          domainName: 'dothis.kr',
          domainAlias: 'www.dothis.kr',
          hostedZone: 'dothis.kr',
        },
      });
      const devSite = new NextjsSite(stack, 'devSite', {
        customDomain: {
          domainName: 'dev.dothis.kr',
          domainAlias: 'dev.dothis.kr',
          hostedZone: 'dothis.kr',
        },
      });

      stack.addOutputs({
        SiteUrl: prodSite.url,
      });

      stack.addOutputs({
        SiteUrl: devSite.url,
      });
    });
  },
} satisfies SSTConfig;
