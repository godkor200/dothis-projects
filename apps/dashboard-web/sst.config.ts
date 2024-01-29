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
    app.stack(function Prod({ stack }) {
      const prodSite = new NextjsSite(stack, 'prodSite', {
        path: '.',
        customDomain: {
          domainName: 'dothis.kr',
          domainAlias: 'www.dothis.kr',
          hostedZone: 'dothis.kr',
        },
        environment: {
          OPENAI_API_KEY: process.env.OPENAI_API_KEY as string,
        },
      });
      stack.addOutputs({
        ProdSiteUrl: prodSite.url,
      });
    });
  },
} satisfies SSTConfig;
