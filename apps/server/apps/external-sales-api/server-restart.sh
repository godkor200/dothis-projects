#!/bin/bash
#!/bin/bash
echo "두디스 외부 api 서버 재시작"

# 이전 Docker 이미지 삭제를 위한 공간 확보
echo "이전 Docker 이미지 삭제 중..."
docker image prune -a
echo "삭제 완료."

# AWS ECR 로그인
echo "ECR에 로그인 중..."
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com
echo "ECR 로그인 완료."

# Docker 이미지 풀
echo "Docker 이미지를 Pull 중..."
docker pull 505558602960.dkr.ecr.ap-northeast-2.amazonaws.com/dothis-external-sales-api:latest
echo "Docker 이미지 Pull 완료."

# 기존의 api-server 컨테이너 스탑
echo "api-server 컨테이너를 정지 중..."
docker stop external-sales-api-server
echo "api-server 컨테이너 정지 완료."

# docker-compose를 이용한 서버 재시작
echo "docker-compose를 이용해 서버를 재시작 중..."
docker-compose -f dothis-external-server/docker-compose.prod.yml up -d
echo "서버 재시작 완료."

echo "모든 작업이 완료되었습니다."