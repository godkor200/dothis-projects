## Description

두디스 프로젝트 API 서버입니다.

## Installation

```bash
//프로젝트 루트에서
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm dev:back-end

# watch mode
$ pnpm dev:back-end

# production mode
$ npm run start:prod
```



## Folder Structure 

이 프로젝트는 도메인 주도 설계(DDD: Domain-Driven Design)의 계층 구조를 따르고 있습니다. 이것은 비즈니스 요구사항에 중점을 둔 설계 패턴으로, 복잡한 도메인을 쉽게 다룰 수 있도록 도와주는 구조입니다.

```bash
.
├── application
│   ├── commands
│   ├── dtos
│   └── services
├── domain
│   ├── entities
│   ├── value-objects
│   └── services
├── infrastructure
│   ├── repositories
│   └── services
└── interfaces
├── controllers
├── dtos
└── middlewares

```

- `application`: 사용자의 요청을 처리하는 계층입니다. 이 계층은 도메인 계층의 비즈니스 로직을 조합하여 사용자의 요청에 따른 서비스를 제공합니다. 서비스 클래스, DTO(Data Transfer Object), 명령 처리기, 쿼리 처리기 등의 다양한 요소가 포함되어 있습니다.

- `domain`: 비즈니스 로직과 비즈니스 규칙을 포함하는 핵심 계층입니다. 이곳에는 엔티티, 값 객체, 도메인 이벤트, 도메인 서비스 등이 포함되어 있습니다. 이 계층은 애플리케이션의 핵심 기능을 제공합니다.

- `infrastructure`: 외부와의 연동을 담당하는 계층입니다. 데이터베이스, 메시지 큐, 메일 서비스 등 외부 시스템과의 통신을 담당합니다. 리포지토리 구현체, 인프라 서비스 등이 이 계층에서 다루어집니다.

- `interfaces`: 사용자 인터페이스나 외부 시스템과의 통신을 담당하는 계층입니다. 사용자의 요청을 받아들이고 처리 결과를 반환하는 컨트롤러, 라우터, 미들웨어, 요청/응답 DTO 등이 이곳에 포함됩니다.

### - Example folder structure

1. **application**: 응용 계층은 사용자의 요청을 처리하며, 도메인 계층의 비즈니스 로직을 조합하여 사용자의 요청에 따른 서비스를 제공합니다. 이 폴더에는 서비스 클래스, DTO(Data Transfer Object), 명령 처리기, 쿼리 처리기 등이 들어갑니다.

```bash
├── commands
│   ├── CreateUserCommand.ts
│   └── DeleteUserCommand.ts
├── dtos
│   ├── UserDto.ts
│   └── CreateUserDto.ts
└── services
    ├── UserService.ts
    └── AuthService.ts
```

2. **domain**: 도메인 계층은 비즈니스 로직과 비즈니스 규칙을 포함합니다. 이 폴더에는 엔티티, 값 객체, 도메인 이벤트, 도메인 서비스 등이 들어갑니다.

```bash
├── entities
│   ├── User.ts
│   └── Post.ts
├── value-objects
│   ├── Email.ts
│   └── Password.ts
└── services
    └── UserService.ts
```

3. **infrastructure**: 인프라 계층은 외부와의 연동을 담당하며, 데이터베이스, 메시지 큐, 메일 서비스 등 외부 시스템과의 통신을 담당합니다. 이 폴더에는 리포지토리 구현체, 인프라 서비스 등이 들어갑니다.

```bash
├── repositories
│   ├── UserRepository.ts
│   └── PostRepository.ts
└── services
    ├── MailService.ts
    └── MessageQueueService.ts
```

4. **interfaces**: 인터페이스 계층은 사용자 인터페이스나 외부 시스템과의 통신을 담당합니다. 이 폴더에는 컨트롤러, 라우터, 미들웨어, 요청/응답 DTO 등이 들어갑니다.

```bash
├── controllers
│   ├── UserController.ts
│   └── PostController.ts
├── dtos
│   ├── CreateUserRequestDto.ts
│   └── CreateUserResponseDto.ts
└── middlewares
    └── AuthenticationMiddleware.ts
```

각 계층은 그에 맞는 책임을 가지며, 계층 간 의존성은 아래쪽 계층에서 위쪽 계층으로 향합니다. 이렇게 함으로써 코드의 유지보수와 확장이 용이해집니다.


## Support

로그인 시퀀스 : [read more here](https://docs.google.com/presentation/d/e/2PACX-1vR9SYkIkXdMKt1jiBZ-KcU3rHpkAvCqYYoKhRTQwIjg9UO6sWmgU1yrMJuW67Cr69Tc82cSxxuOExsV/pub?start=false&loop=false&delayms=3000).

api doc : [doc](https://api.dothis.kr/docs)

## Author Information

이름: 유병국

Email: godkor200@gmail.com

GitHub: [GitHub](https://github.com/godkor200)

