#!/bin/bash

# --- # --- # --- # --- # --- # --- # --- # --- #{}
# --- # --- # --- # --- # --- # --- # --- # --- #{}
# prepare secrets here
# --- # --- # --- # --- # --- # --- # --- # --- #{}
# --- # --- # --- # --- # --- # --- # --- # --- #{}
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
echo " >> prepare all secrets: + "
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "

export POKUS_MONGO_ADMIN_USER="pokus"
export POKUS_MONGO_ADMIN_PASS="pokus"
export POKUS_BASICAUTH_USERNAME="pokus"
export POKUS_BASICAUTH_PASSWORD="pokus"
export POKUS_SITE_COOKIESECRET=$(openssl rand -hex 32)
export POKUS_SITE_SESSIONSECRET=$(openssl rand -hex 32)
export POKUS_MONGODB_URL="pokus"
export POKUS_MONGODB_AUTH_DATABASE="pokus"
export POKUS_MONGODB_AUTH_USERNAME="pokus"
export POKUS_MONGODB_AUTH_PASSWORD="pokus"


mkdir -p ./docker/run/.secrets
echo "${POKUS_MONGO_ADMIN_USER}" > ./docker/run/.secrets/mongo_admin_user.txt
echo "${POKUS_MONGO_ADMIN_PASS}" > ./docker/run/.secrets/mongo_admin_pass.txt
echo "${POKUS_BASICAUTH_USERNAME}" > ./docker/run/.secrets/basicauth_username.txt
echo "${POKUS_BASICAUTH_PASSWORD}" > ./docker/run/.secrets/basicauth_password.txt
echo "${POKUS_SITE_COOKIESECRET}" > ./docker/run/.secrets/site_cookiesecret.txt
echo "${POKUS_SITE_SESSIONSECRET}" > ./docker/run/.secrets/site_sessionsecret.txt
echo "${POKUS_MONGODB_URL}" > ./docker/run/.secrets/mongodb_url.txt
echo "${POKUS_MONGODB_AUTH_DATABASE}" > ./docker/run/.secrets/mongodb_auth_database.txt
echo "${POKUS_MONGODB_AUTH_USERNAME}" > ./docker/run/.secrets/mongodb_auth_username.txt
echo "${POKUS_MONGODB_AUTH_PASSWORD}" > ./docker/run/.secrets/mongodb_auth_password.txt
















export ADMIN_USER=pokus
export ADMIN_PASSWORD=pokus
export GENERATED_SECRET_VALUE=$(docker run --rm caddy caddy hash-password --plaintext "${ADMIN_PASSWORD}")
echo " >++++++>++>     GENERATED_SECRET_VALUE=[${GENERATED_SECRET_VALUE}]"
export ADMIN_PASSWORD_HASH=${GENERATED_SECRET_VALUE}
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
cat <<EOF> ./.env
ADMIN_USER=${ADMIN_USER}
ADMIN_PASSWORD=${ADMIN_PASSWORD}
ADMIN_PASSWORD_HASH=${ADMIN_PASSWORD_HASH}
EOF
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
echo " >> generated [./.env]: + "
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
cat ./.env
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
