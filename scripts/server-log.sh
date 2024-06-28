#!/bin/bash

echo 'prod:server:log'
ssh DOTHIS_SERVER << 'EOF'
echo '슬립 5초'
sleep 5
echo '로그 실행'
docker logs -f api-server
EOF