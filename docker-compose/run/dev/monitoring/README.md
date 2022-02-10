# The PokusBox Monitoring stack

## Run the stack

```bash
export DESIRED_VERSION="master"
export DESIRED_VERSION="feature/oauth2-restream"

git clone git@github.com:pokusio/passportjs-quickie.git
cd passportjs-quickie/
git checkout ${DESIRED_VERSION}

export DOCKER_COMPOSE_PATH="./docker-compose/run/dev/monitoring/docker-compose.prometheus.yml"
docker-compose -f ${DOCKER_COMPOSE_PATH} up -d mongo
# ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> --->
# ---> Then go to http://0.0.0.0:8084/  for the MongoDB WebUI

# To restart with fresh empty database :
# docker-compose -f ${DOCKER_COMPOSE_PATH} down --volumes && docker-compose -f ${DOCKER_COMPOSE_PATH} up --force-recreate -d && docker-compose -f ${DOCKER_COMPOSE_PATH} logs -f mongo_webui | more

```




## Update the stack

* To update the stack to a new version :

```bash
export DOCKPROM_DESIRED_VERSION="v4.16.0"
git clone https://github.com/stefanprodan/dockprom
cd dockprom
git checkout ${DOCKPROM_DESIRED_VERSION}
rm -fr ./.git/

cd ../

cat <<EOF> ./README.top.md

# The PokusBox Monitoring stack

\`\`\`bash
export DOCKPROM_DESIRED_VERSION="${DOCKPROM_DESIRED_VERSION}"
git clone https://github.com/stefanprodan/dockprom
cd dockprom
git checkout \${DOCKPROM_DESIRED_VERSION}
rm -fr ./.git/
cd ../

\`\`\`bash

EOF

cd ../

cat ./README.top.md

```
