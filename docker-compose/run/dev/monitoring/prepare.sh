#!/bin/bash

# ---
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
echo " >> prepare all secrets: + "
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
echo " ># --- # --- # --- # --- # --- # --- # --- # --- #{} "
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


exit 0


export DOCKPROM_DESIRED_VERSION="v4.16.0"
git clone https://github.com/stefanprodan/dockprom
cd dockprom
git checkout ${DOCKPROM_DESIRED_VERSION}
rm -fr ./.git/
cd ../



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








docker-compose up -d && docker-compose logs -f
