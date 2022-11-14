
## Apps and Packages

### packages \/

#### config
프로젝트에 공통적으로 쓰일 `eslint`, `tsconfig.json`이 모여있는 패키지입니다.

#### share
Apps에서 쓰일 공통 ui, util, type, theme 같이 여러 앱에서 사용되는 코드가 모여있는 패키지입니다. 
추후 서버단에서도 같이 사용할 라이브러리는 따로 분리하면 좋을 것 같습니다.

### apps \/
#### request-web
요청하기 기능 웹입니다. [프로덕트(MVP)](https://dothis.world/),
[Figma](https://www.figma.com/file/1zh1zegJLDMApFq5FZXBj8/%EB%91%90%EB%94%94%EC%8A%A4-%EC%A7%84%EC%A7%9C%EC%B5%9C%EC%A2%85?node-id=3433%3A5178&t=QMPcqN77fnSecPgL-1)


---

#### 추후 만들어야하는 app

**api**
API 서버, 현재 prisma, trpc로 구성되어 있는 db, api 서버단을 분리.

**app**
두디스 모바일 애플리케이션 (`request-web`, `dashboard` 등을 포함)

**dashboard**
유튜브 분석을 통한 대시보드


## Techstack(공통)

### Develop
- [pnpm](https://pnpm.io/ko/): 패키지 매니저
- [turborepo](https://turbo.build/): 모노레포 관리, 캐싱
- [Typescript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io): code formatting

### Apps
server & client
- [Trpc](https://trpc.io/): 서버 - 클라이언트간 type safety한 데이터 전송을 위한 방식.  
- [Prisma](https://www.prisma.io/): ORM, DB generate, migration tool. typescript 타입 generate 해줌으로써 훨신 편하고 생산성 높은 데이터베이스 사용이 가능함.
- [Next.js](https://nextjs.org/): React SSR, SSG, ISR Framework. 현재 request-web 앱에서 nextjs내에 백엔드, api 서버도 포함.
- [Next-auth](https://next-auth.js.org/) next에서 사용되는 OAuth 인증 라이브러리. prisma와도 연동되어있음.
- [iron-session](https://github.com/vvo/iron-session) 세션 관리 라이브러리.
- [Zod](https://zod.dev/): typescript schema, validation 라이브러리. 

client
- [React](https://reactjs.org/) 
- [Chakra UI](https://chakra-ui.com/): React UI Framework.
- [Emotion](https://emotion.sh/): CSS-in-JS, ui 스타일링 라이브러리
- [Zustand](https://github.com/pmndrs/zustand): 간단한 클라이언트 사이드에서의 상태관리.
- [react-hook-form](https://react-hook-form.com/): form validation, submit, error handling 라이브러리.
- [swiper](https://swiperjs.com/): 슬라이더 라이브러리.
- [fp-ts](https://gcanti.github.io/fp-ts/): typescript functional programming 유틸
- [date-fns](https://date-fns.org/): date 관련 유틸


### 각 패키지, 앱별 README!
### [request-web](./apps/request-web/README.md)
### [share](./packages/share/README.md)

## CLI

### Develop
개발 서버 실행
```
pnpm dev
```

### Build
빌드
```
pnpm build
```

### Generate

.prisma 파일을 통한 DB, type generate
```
pnpm db-generate
```
---

generate한 DB를 서버에 업로드
```
pnpm db-push
```
---

prisma studio를 실행.

```
pnpm studio
```
---

database schema를 직접적으로 바꿨다면 ```pnpm db-pull```을 실행하여 프로젝트의 prisma를 서버와 맞춰야합니다.
가능한 prisma.schema 파일을 수정 후 db-generate후 db-push를 하는 것을 추천드립니다.

[추가적인 prisma 주의사항 확인](https://medium.com/prisma-korea/supabase-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-prisma%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0-4017a4be920d)
```
pnpm db-pull
```
---

chakra-ui의 테마 타입을 generate
```
pnpm theme-generate
```



### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpm dlx turbo link
```
