#!/bin/bash
echo '외부 공개 api 배포 빌드'
echo 'amd64 아키텍처로 빌드'
docker build -t external-sales-api -f ~/Desktop/project/dothis/apps/server/apps/external-sales-api/Dockerfile.production ~/Desktop/project/dothis
echo '로그인'
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com
echo '태깅'
docker tag external-sales-api:latest 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com/dothis-external-sales-api:latest
echo 'ECR push'
docker push 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com/dothis-external-sales-api:latest

# 현재 시각 출력
echo '현재 시각:'
date