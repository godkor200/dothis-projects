FROM node:21-alpine AS base

ENV PNPM_HOME /usr/local/share/pnpm
ENV PATH $PNPM_HOME:$PATH
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g pnpm
RUN pnpm install turbo -g
RUN pnpm install pm2 -g


FROM base AS builder
WORKDIR /app
COPY . .
RUN turbo prune server --docker

FROM base AS installer
WORKDIR /app
RUN apk add --no-cache g++ make gcc cmake

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml /app/pnpm-lock.yaml
RUN pnpm install

##Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
#
RUN turbo run build:api --no-cache --filter=server

FROM base AS runner
WORKDIR /app

COPY --from=installer /app .

CMD ["pm2-runtime", "start", "apps/server/apps/api/ecosystem.config.js"]