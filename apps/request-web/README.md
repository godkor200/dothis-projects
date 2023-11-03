## request-web

요청하기 웹

## Struct

### prisma/
prisma를 이용한 Database schema, migration, seed 파일이 들어있는 디렉토리

schema에 대한 설명은 [여기](./prisma/readme.md)를 참고하시길 바랍니다. (현재는 필드가 조금 다를 수 있습니다.)

### src/
리소스 폴더

#### src/pages/
사용자가 url을 통한 접근 가능한 페이지들이 들어있는 디렉토리.

nextjs에서의 [pages 폴더 가이드](https://nextjs.org/docs/basic-features/pages)를 참조하시길 바랍니다.

#### src/components/
request-web에서 사용될 특징적인 컴포넌트들.

주로 request-web에서의 도메인을 사용하거나 클라이언트 사이드에서 api를 호출하는 등의 컴포넌트들이 있습니다.

공용 컴포넌트의 경우엔 [share 패키지](../../packages/share)에 위치 해야합니다.

#### src/constants/
request-web에서 사용되는 도메인에 속하지 않는 상수, 상수 생성자들이 들어있는 디렉토리.


#### src/domain/
request-web에서 사용되는 도메인들이 들어있는 디렉토리.

여기에서의 도메인은 프로덕트의 주축을 이루는 개념을 의미합니다.

prisma schema의 model과 1:1로 대응되는 비즈니스 로직의 도메인들이 있습니다.

여기에서의 schema는 prisma의 schema와 다르게 도메인의 비즈니스 로직을 표현하는 것에 초점을 맞추고 있습니다.

여기에서 procedure는 trpc에서의 각 종점(end point)를 의미합니다.

도메인의 procedure들은 해당 도메인의 router에 속하게 됩니다.

각 도메인에 속하는 utils, constants, interface, schema는 각각의 도메인 폴더 내에 위치해야 합니다.

### src/server/

서버단에서 실행되는 파일들이 들어있는 디렉토리.

### src/components/

**ui**: 가장 작은 단위의 ui 컴포넌트들이 위치함

**layout**: 페이지의 레이아웃을 담당하는 컴포넌트들이 위치함

**article**: 단독적으로 쓰일 수 있는 컨텐츠 조각

**contents**: 단독적으로 페이지를 구성할 수 있는 컨텐츠 덩어리
