#!/bin/bash
echo '내부 api 배포 빌드'
#먼저 로컬에서 선행되어야 할 작업
echo 'amd64 아키텍처로 빌드'
docker build -t dothis-server -f ~/Desktop/project/dothis/apps/server/apps/api/Dockerfile.production ~/Desktop/project/dothis
echo '로그인'
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com
echo '태깅'
docker tag dothis-server:latest 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com/dothis-server:latest
echo 'ECR push'
docker push 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com/dothis-server:latest

