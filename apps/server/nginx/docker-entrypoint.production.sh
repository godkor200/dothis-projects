#!/bin/bash
echo '============================'
echo 'Running nginx'
echo '============================'

chmod +x /wait-for-it.sh
echo '============================'
echo 'Running api-server'
echo '============================'
/wait-for-it.sh api-server:8080 --timeout=80 -- nginx -g 'daemon off;' &

echo '============================'
echo 'Running external-sales-api-server'
echo '============================'
/wait-for-it.sh external-sales-api-server:8081 --timeout=80 -- nginx -g 'daemon off;'
