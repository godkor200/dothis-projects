import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  ClientOptions,
  Client as OpensearchClient,
} from '@opensearch-project/opensearch';

/**
 * 오픈서치 클라이언트 생성시 오픈서치 도메인을 구분하기 위한 파라미터 추가
 *
 * @example
 * OpensearchModule.forRoot([
 * 			{
 * 				clientName: "admin",
 * 				node: process.env.ES_ADMIN_HOST,
 * 			},
 * 		]),
 */
export type OpensearchClientModuleExtras = {
  clientName?: string;
};
export type OpensearchClientFactoryOptions = ClientOptions &
  OpensearchClientModuleExtras;

// @Inject시 사용할 오픈서치 클라이언트 토큰을 생성한다.
// ex) OPENSEARCH_CLIENT_default 기본 오픈서치 클라이언트
// ex) OPENSEARCH_CLIENT_admin   어드민 오픈서치 클라이언트
export const DEFAULT_OPENSEARCH_CLIENT_NAME = 'default';
export const getOpensearchClientToken = (
  clientName: string = DEFAULT_OPENSEARCH_CLIENT_NAME,
): string => `OPENSEARCH_CLIENT_${clientName}`;

@Module({})
export class OpensearchModule {
  public static forRoot(
    options: OpensearchClientFactoryOptions | OpensearchClientFactoryOptions[],
  ): DynamicModule {
    const searchRepositoryProviders: Provider[] = [];
    const opensearchClientProviders = OpensearchModule.buildProviders(options);
    return {
      global: true,
      module: OpensearchModule,
      providers: [...opensearchClientProviders, ...searchRepositoryProviders],
      exports: [...opensearchClientProviders, ...searchRepositoryProviders],
    };
  }

  public static forRootAsync(options: {
    imports: any[];
    inject: any[];
    useFactory: (
      ...args: any[]
    ) =>
      | OpensearchClientFactoryOptions
      | Promise<OpensearchClientFactoryOptions>;
  }): DynamicModule {
    const asyncProviders = [
      {
        provide: getOpensearchClientToken(),
        useFactory: async (...args: any[]) => {
          const factoryOptions = await options.useFactory(...args); // 수정된 부분. `options` 변수명 변경
          const client = new OpensearchClient(factoryOptions);

          // 엔티티 처리 로직 추가
          // if (factoryOptions.entities) {
          //   for (const entity of factoryOptions.entities) {
          //     // 엔티티 초기화 또는 인덱스 생성 등의 작업 수행
          //     // 예를 들면, 클라이언트를 사용하여 엔티티의 인덱스를 생성하는 작업
          //     // await client.indices.create({ index: entity.name.toLowerCase() });
          //   }
          // }

          return client;
        },
        inject: options.inject,
      },
    ];

    return {
      global: true,
      module: OpensearchModule,
      imports: options.imports,
      providers: asyncProviders,
      exports: asyncProviders,
    };
  }

  private static buildProviders(
    options: OpensearchClientFactoryOptions | OpensearchClientFactoryOptions[],
  ): Provider[] {
    if (!Array.isArray(options)) {
      return OpensearchModule.buildProviders([options]);
    }

    return options.map((option) => ({
      provide: getOpensearchClientToken(option.clientName),
      useValue: new OpensearchClient({
        ...option,
      }),
    }));
  }
}
