#!/bin/bash

#먼저 로컬에서 선행되어야 할 작업
#amd64 아키텍처로 빌드
#docker build . -t 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com/dothis-server:latest --platform=linux/amd64
#로그인
#aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com
#태깅
#docker tag dothis-server:latest 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com/dothis-server:latest
#ecr push
#docker push 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com/dothis-server:latest

#ec2 instance
#로그인
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com
#풀
docker pull 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com/dothis-server:latest
#컨테이너 api-server 스탑
docker stop api-server
#docker-compose로 전부 다시 run
docker-compose -f docker-compose.prod.yml up -d
