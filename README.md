# Who am I?

Well I am an OAuth2 application, that can play with restream.io Rest API (in the name of you)

So what do i do ?

* I can watch `Restream` and be informed everytime a new live is launched, and retrieve all the livestreams URLS across social networks.

## Run locally

#### prepare the secrets

* execute :

```bash
mkdir -p ./docker/run/
cp -fr ./docker/run.template/* ./docker/run/*

```
* Now :
  * edit `pokus.secrets.json` to set your Google and Restream.io OAuth2 secrets : ClientID and ClientSecret
  * edit `pokus.secrets.json` to set your Database credentials
  * edit the files under the `./docker/run/.secrets` folder:
    * those secrets are used by mongo-express, to fetch its secrets from docker secrets, `pokus.secrets.json`

* And finally :

```bash
export GENERATED_SECRET=$(openssl rand -hex 32)
echo "${GENERATED_SECRET}" > docker/run/.secrets/site_cookiesecret.txt

export GENERATED_SECRET=$(openssl rand -hex 32)
echo "${GENERATED_SECRET}" > docker/run/.secrets/site_sessionsecret.txt

```

#### start the mongo database

```bash
export DOCKER_COMPOSE_PATH="docker-compose/run/dev/database/docker-compose.mongo.yml"
docker-compose -f ${DOCKER_COMPOSE_PATH} up -d mongo
# ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> --->
# ---> Then go to http://0.0.0.0:8084/  for the MongoDB WebUI

# To restart with fresh empty database :
# docker-compose -f ${DOCKER_COMPOSE_PATH} down --volumes && docker-compose -f ${DOCKER_COMPOSE_PATH} up --force-recreate -d && docker-compose -f ${DOCKER_COMPOSE_PATH} logs -f mongo_webui | more

```

* Now go to http://0.0.0.0:8084/ , you should have the Mongo Express Web UI :

![mongo webui](./documentation/images/mongo_express.png)



#### start `PokusBox`

* In watch mode, (any change):

```bash
npm i
npm run wlog

# you get the logs into the ./pokus.watch.logs  logs file
```

#### Test the API Endpoints

* Finally, you can run the following commands to test all REST API Endpoints :

```bash

#########################################
## POST /api/v1/pupppies
#
export MY_PUPPY="{ \
  \"cute_name\": \"cherry\", \
  \"description\": \"shes a such a good dog, always warm welcoming home\", \
  \"is_female\": true, \
  \"color\": \"blue\" \
}"

echo "${MY_PUPPY}" | jq .

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPY}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPY}"

export MY_PUPPY="{ \
  \"cute_name\": \"rollercoaster\", \
  \"description\": \"hes a  bit crazy, but all in all a real good dog, always definding home\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPY}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPY}"


export MY_PUPPY="{ \
  \"cute_name\": \"madison\", \
  \"description\": \"shes a  bit crazy, but madison all in all a real good dog, always cheerful\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPY}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPY}"


export MY_PUPPY="{ \
  \"cute_name\": \"grace\", \
  \"description\": \"shes very quiet, an eats a lot :), plus she's very esay going with children\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPY}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPY}"


export MY_PUPPY="{ \
  \"cute_name\": \"kelly\", \
  \"description\": \"she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPY}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPY}"



export MY_PUPPY="{ \
  \"cute_name\": \"charlie\", \
  \"description\": \"another dog i added fr tests.\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPY}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPY}"



export MY_PUPPY="{ \
  \"cute_name\": \"china\", \
  \"description\": \"another yellow dog named china i added fr tests.\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPY}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPY}"

# try adding 2 puppies with same name, but the other one has another description
export MY_PUPPY="{ \
  \"cute_name\": \"china\", \
  \"description\": \"that's the other one that has a different description, znd which will never be added n saved to the database. Will throw a Monggose Exception.\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPY}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPY}"


cat <<EOF >./example.output.of.case.logs
****
error:   /****** [createPuppy = ()] Saving Puppy FAILED!!!
error:   /*************************************************************************
error:   -----------------------------------------------------------------------------
error:   An error occured during the execution of  [createPuppy = () => {] :
error:   E11000 duplicate key error collection: pokus.puppies index: cute_name_1 dup key: { cute_name: "china" }
error:   -----------------------------------------------------------------------------
EOF

echo "-----------------------------------------------------------------------------"
echo "  Now you should have an output like this : "
echo "-----------------------------------------------------------------------------"
cat ./example.output.of.case.logs
echo "-----------------------------------------------------------------------------"

#########################################
## GET /api/v1/pupppies
#    ?search=cha
#    ?search=cha&female=false
#    ?search=cha&female=false&color=yellow
#

export POKUS_QUERY_PARAMS="search=ch" && curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"


# ---
# ---
# ---  with 'color', but no 'is_female' search criterias :
export POKUS_QUERY_PARAMS="search=ch&color=yellow" && curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"

# ---
# ---
# ---  with 'color', but no 'is_female' search criterias :
export POKUS_QUERY_PARAMS="search=ch&color=blue" && curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"

export POKUS_QUERY_PARAMS="search=cha"
curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"



# --->>> no 'color', but with 'is_female' search criterias :
export POKUS_QUERY_PARAMS="search=cha&female=false" && curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"

export POKUS_QUERY_PARAMS="search=cha&female=true" && curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"

export POKUS_QUERY_PARAMS="search=ch&female=true&color=yellow" && curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"

export POKUS_QUERY_PARAMS="search=&female=true&color=yellow" && curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"


# Get puppy by id
export PUPPY_ID="62005b5b827d6996ec40a087"
export POKUS_QUERY_PARAMS="puppy_id=${PUPPY_ID}&search=&female=true&color=yellow" && curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"



```
* test updating a puppy :

```bash
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# 62005b5b827d6996ec40a087 : see [docker/run.template/mongo/mongo-init.js]

export PUPPY_ID="62007bfa1d6266b54970d9c8"
export WRONG_PUPPY_ID="92005b5b827d6996ec40a089"
export MY_PUPPY="{ \
  \"puppy_id\": \"${PUPPY_ID}\", \
  \"cute_name\": \"kelly updated\", \
  \"description\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"color\": \"green\" \
}"

## Detect error cases first

export POKUS_QUERY_PARAMS="puppy_id=${WRONG_PUPPY_ID}&search=&female=true&color=yellow"

# - #
# First check indeed there is no puppy with that id
curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"

export MY_PUPPY="{ \
  \"puppy_id\": \"${WRONG_PUPPY_ID}\", \
  \"cute_name\": \"kelly updated\", \
  \"description\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"color\": \"green\" \
}"
# - #
# Then try and update the puppy that does not exist
curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPY}" -X PUT -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPY}"


## Then test successfully updating a puppy

export MY_PUPPY="{ \
  \"puppy_id\": \"${PUPPY_ID}\", \
  \"cute_name\": \"kelly updated\", \
  \"description\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"color\": \"green\" \
}"

export POKUS_QUERY_PARAMS="puppy_id=${PUPPY_ID}&search=&female=true&color=yellow"

curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPY}" -X PUT -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPY}"

curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"
```

* To test deleting puppies :

```bash
export PUPPY_ID="62007bfa1d6266b54970d9c8"
export WRONG_PUPPY_ID="92005b5b827d6996ec40a089"

# + -> Should fail (to test the error mgmt behavior) :
curl -X DELETE -iv "http://127.0.0.1:9099/api/v1/puppies?puppy_id=${WRONG_PUPPY_ID}"
# + -> Should succeed :
curl -X DELETE -iv "http://127.0.0.1:9099/api/v1/puppies?puppy_id=${PUPPY_ID}"

```

* turn all this into newman tests, that will run autolatically with mochajs tests i guess


* run all api tests :

```bash
npm run e2e-api
```



## Generate me


## Annex C : Mongo Express environment variables

For Mongo Express :


Name                            | Default         | Description
--------------------------------|-----------------|------------
ME_CONFIG_BASICAUTH_USERNAME    | ''              | mongo-express web username
ME_CONFIG_BASICAUTH_PASSWORD    | ''              | mongo-express web password
ME_CONFIG_MONGODB_ENABLE_ADMIN  | 'true'          | Enable admin access to all databases. Send strings: `"true"` or `"false"`
ME_CONFIG_MONGODB_ADMINUSERNAME | ''              | MongoDB admin username
ME_CONFIG_MONGODB_ADMINPASSWORD | ''              | MongoDB admin password
ME_CONFIG_MONGODB_PORT          | 27017           | MongoDB port
ME_CONFIG_MONGODB_SERVER        | 'mongo'         | MongoDB container name. Use comma delimited list of host names for replica sets.
ME_CONFIG_OPTIONS_EDITORTHEME   | 'default'       | mongo-express editor color theme, [more here](http://codemirror.net/demo/theme.html)
ME_CONFIG_REQUEST_SIZE          | '100kb'         | Maximum payload size. CRUD operations above this size will fail in [body-parser](https://www.npmjs.com/package/body-parser).
ME_CONFIG_SITE_BASEURL          | '/'             | Set the baseUrl to ease mounting at a subdirectory. Remember to include a leading and trailing slash.
ME_CONFIG_SITE_COOKIESECRET     | 'cookiesecret'  | String used by [cookie-parser middleware](https://www.npmjs.com/package/cookie-parser) to sign cookies.
ME_CONFIG_SITE_SESSIONSECRET    | 'sessionsecret' | String used to sign the session ID cookie by [express-session middleware](https://www.npmjs.com/package/express-session).
ME_CONFIG_SITE_SSL_ENABLED      | 'false'         | Enable SSL.
ME_CONFIG_SITE_SSL_CRT_PATH     | ''              | SSL certificate file.
ME_CONFIG_SITE_SSL_KEY_PATH     | ''              | SSL key file.

The following are only needed if ME_CONFIG_MONGODB_ENABLE_ADMIN is "false" :

Name                            | Default         | Description
--------------------------------|-----------------|------------
ME_CONFIG_MONGODB_AUTH_DATABASE | 'db'            | Database name
ME_CONFIG_MONGODB_AUTH_USERNAME | 'admin'         | Database username
ME_CONFIG_MONGODB_AUTH_PASSWORD | 'pass'          | Database password


also latest i got from https://github.com/mongo-express/mongo-express#usage-docker :


Name                              | Default         | Description
----------------------------------|-----------------|------------
`ME_CONFIG_MONGODB_URL`           | `mongodb://admin:pass@localhost:27017/db?ssl=false`
`ME_CONFIG_MONGODB_ENABLE_ADMIN`  | `false`         | Enable administrator access. Send strings: `"true"` or `"false"`.
`ME_CONFIG_MONGODB_AUTH_DATABASE` | `db`            | Database name (only needed if `ENABLE_ADMIN` is `"false"`).
`ME_CONFIG_MONGODB_AUTH_USERNAME` | `admin`         | Database username (only needed if `ENABLE_ADMIN` is `"false"`).
`ME_CONFIG_MONGODB_AUTH_PASSWORD` | `pass`          | Database password (only needed if `ENABLE_ADMIN` is `"false"`).
`ME_CONFIG_SITE_BASEURL`          | `/`             | Set the express baseUrl to ease mounting at a subdirectory. Remember to include a leading and trailing slash.
`ME_CONFIG_SITE_COOKIESECRET`     | `cookiesecret`  | String used by [cookie-parser middleware](https://www.npmjs.com/package/cookie-parser) to sign cookies.
`ME_CONFIG_SITE_SESSIONSECRET`    | `sessionsecret` | String used to sign the session ID cookie by [express-session middleware](https://www.npmjs.com/package/express-session).
`ME_CONFIG_BASICAUTH_USERNAME`    | ``              | mongo-express web login name. Sending an empty string will disable basic authentication.
`ME_CONFIG_BASICAUTH_PASSWORD`    | ``              | mongo-express web login password.
`ME_CONFIG_REQUEST_SIZE`          | `100kb`         | Used to configure maximum mongo update payload size. CRUD operations above this size will fail due to restrictions in [body-parser](https://www.npmjs.com/package/body-parser).
`ME_CONFIG_OPTIONS_EDITORTHEME`   | `rubyblue`      | Web editor color theme, [more here](http://codemirror.net/demo/theme.html).
`ME_CONFIG_OPTIONS_READONLY`      | `false`         | if readOnly is true, components of writing are not visible.
`ME_CONFIG_OPTIONS_NO_DELETE`      | `false`         | if noDelete is true, components of deleting are not visible.
`ME_CONFIG_SITE_SSL_ENABLED`      | `false`         | Enable SSL.
`ME_CONFIG_MONGODB_SSLVALIDATE`   | `true`          | Validate mongod server certificate against CA
`ME_CONFIG_SITE_SSL_CRT_PATH`     | ` `             | SSL certificate file.
`ME_CONFIG_SITE_SSL_KEY_PATH`     | ` `             | SSL key file.
`ME_CONFIG_SITE_GRIDFS_ENABLED`   | `false`         | Enable gridFS to manage uploaded files.
`VCAP_APP_HOST`                   | `localhost`     | address that mongo-express will listen on for incoming connections.
`VCAP_APP_PORT`                   | `8081`          | port that mongo-express will run on.
`ME_CONFIG_MONGODB_CA_FILE`       | ``              | CA certificate File
`ME_CONFIG_BASICAUTH_USERNAME_FILE`     | ``        | File version of ME_CONFIG_BASICAUTH_USERNAME
`ME_CONFIG_BASICAUTH_PASSWORD_FILE`     | ``        | File version of ME_CONFIG_BASICAUTH_PASSWORD
`ME_CONFIG_MONGODB_ADMINUSERNAME_FILE`  | ``        | File version of ME_CONFIG_MONGODB_ADMINUSERNAME
`ME_CONFIG_MONGODB_ADMINPASSWORD_FILE`  | ``        | File version of ME_CONFIG_MONGODB_ADMINPASSWORD
`ME_CONFIG_MONGODB_AUTH_USERNAME_FILE`  | ``        | File version of ME_CONFIG_MONGODB_AUTH_USERNAME
`ME_CONFIG_MONGODB_AUTH_PASSWORD_FILE`  | ``        | File version of ME_CONFIG_MONGODB_AUTH_PASSWORD



## Mongo Express


I experienced a small issue while setting up MongoExpress as Web UI for my mongodb.

That issue was about networking, and here is how i diagnosed all this :

```bash
export DOCKER_COMPOSE_PATH="docker-compose/run/dev/database/docker-compose.mongo.yml"
# I first start the mong database only (not mongo express)
docker-compose -f ${DOCKER_COMPOSE_PATH} up -d mongo

# then i run a standalone container, connecting it into the same docker network, of type bridge.

docker stop jblm && docker rm jblm

docker run -itd --name jblm --restart always -e ME_CONFIG_MONGODB_URL="mongodb://pokus:pokus@mongo.pok-us.io:27017/pokus?ssl=false" --add-host "mongo.pok-us.io:192.168.1.102" --network hugo-starter-node_mongo_net --entrypoint "/bin/sh" debian


docker exec -it jblm bin -c "apt-get update -y && apt-get install -y iputils-ping"
docker exec -it jblm bin -c "ping -c 4 mongo"

docker stop jblm && docker rm jblm

# and to test running mongo-express as simply as possible, which works ! Go to http://0.0.0.0:8083/
docker run -it --name jblmn --rm -p 0.0.0.0:8083:8081 \
    --add-host "mongo.pok-us.io:192.168.1.102" \
    -e ME_CONFIG_MONGODB_URL="mongodb://pokus:pokus@mongo.pok-us.io:27017/pokus?ssl=false" \
    -e ME_CONFIG_MONGODB_AUTH_DATABASE="pokus" \
    -e ME_CONFIG_MONGODB_AUTH_USERNAME="pokus" \
    -e ME_CONFIG_MONGODB_AUTH_PASSWORD="pokus" \
    -e ME_CONFIG_BASICAUTH_USERNAME="pokus" \
    -e ME_CONFIG_BASICAUTH_PASSWORD="pokus" \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME="pokus" \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD="pokus" \
    --network hugo-starter-node_mongo_net \
    mongo-express:0.54.0

```

## Testing database


* Testing database connection:

```bash

docker run --name jbltest -itd --restart always mongo sh

docker exec -it jbltest sh -c "mongo --version"
docker exec -it jbltest sh -c "apt-get update -y && apt-get install -y iputils-ping"

export POKUSDB_USERNAME="user"
export POKUSDB_USERPWD="user"
export POKUSDB_NET_HOST="192.168.1.102"


export TEST_QUERY="mongo -u \"${POKUSDB_USERNAME}\" -p \"${POKUSDB_USERPWD}\" ${POKUSDB_NET_HOST} --authenticationDatabase \"admin\""


docker exec -it jbltest sh -c "${TEST_QUERY}"

# ===>>>
# ===>>>
# ===>>> Okay, so a first test with wrong user/pwd  involves authentication failed, that's good n expected.
# ===>>>
# ===>>>


# bash-3.2$ export POKUSDB_USERNAME="user"
# bash-3.2$ export POKUSDB_USERPWD="user"
# bash-3.2$ export POKUSDB_NET_HOST="192.168.1.102"
# bash-3.2$
# bash-3.2$
# bash-3.2$ export TEST_QUERY="mongo -u \"${POKUSDB_USERNAME}\" -p \"${POKUSDB_USERPWD}\" ${POKUSDB_NET_HOST} --authenticationDatabase \"admin\""
# bash-3.2$
# bash-3.2$
# bash-3.2$ docker exec -it jbltest sh -c "${TEST_QUERY}"
#
# MongoDB shell version v5.0.6
# connecting to: mongodb://192.168.1.102:27017/test?authSource=admin&compressors=disabled&gssapiServiceName=mongodb
# Error: Authentication failed. :
# connect@src/mongo/shell/mongo.js:372:17
# @(connect):2:6
# exception: connect failed
# exiting with code 1
# bash-3.2$


export POKUSDB_USERNAME="pokus"
export POKUSDB_USERPWD="pokus"
export POKUSDB_NET_HOST="192.168.1.102"
export POKUSDB_AUTH_DB="admin"


export TEST_QUERY="mongo -u \"${POKUSDB_USERNAME}\" -p \"${POKUSDB_USERPWD}\" ${POKUSDB_NET_HOST} --authenticationDatabase \"${POKUSDB_AUTH_DB}\""


docker exec -it jbltest sh -c "${TEST_QUERY}"

# and there we have an authentication success as the super dooper admin
```

Right, now i see one thing that i do not specify in my `mongoDbURI` : the authentication database. That's with i added the `?authSource=admin` query param in `mongoDbURI`.

* Testing database queries


```bash

docker stop jbltest
docker rm jbltest
docker run --name jbltest -itd --restart always mongo sh


export POKUSDB_USERNAME="pokus"
export POKUSDB_USERPWD="pokus"
export POKUSDB_NET_HOST="192.168.1.102"
export POKUSDB_AUTH_DB="admin"
export POKUS_DB_NAME="pokus"
export MONGO_USER_NAME=pokus
export MONGO_USER_PASSWORD=pokus
export MONGO_DB_URI="mongodb://${MONGO_USER_NAME}:${MONGO_USER_PASSWORD}@${POKUSDB_NET_HOST}:27017/${POKUS_DB_NAME}?authSource=admin&ssl=false&retryWrites=true&w=majority"



export TEST_QUERY="mongo -u \"${POKUSDB_USERNAME}\" -p \"${POKUSDB_USERPWD}\" ${POKUSDB_NET_HOST} --authenticationDatabase \"${POKUSDB_AUTH_DB}\""

docker exec -it jbltest sh -c "${TEST_QUERY}"


cat <<EOF > ./mongo.script.js

var db = connect('${MONGO_DB_URI}');
print('Database connected');

allPuppies = db.puppies.find();

//iterate the names collection and output each document
while (allPuppies.hasNext()) {
   printjson(allPuppies.next());
}
exampleResult = db.puppies.find({cute_name: /ch.*/});
db.puppies.find({cute_name: /c.*/});
db.puppies.find({cute_name: /.*ch.*/});
print('test jbl de print');

EOF

docker cp $PWD/mongo.script.js jbltest:/
docker exec -it jbltest sh -c "ls -alh /mongo.script.js"
docker exec -it -u root jbltest sh -c "cp -f /mongo.script.js /root && rm /mongo.script.js"
docker exec -it -u root jbltest sh -c "chmod a+rwx /root/mongo.script.js"
docker exec -it jbltest sh -c "mongo ${MONGO_DB_URI} /root/mongo.script.js"



# puppies.find({ cute_name: "/ch/i"})
```


### Restream IO OAuth2 Scopes

While I logged in `Restream.IO` for the first time, I saw a list of the OAuth2 scopes available at `Restream.IO` :

![`Restream.IO` OAuth2 scopes - s1](./documentation/images/oauth2/restream/POKUS_RESTREAM_IO_OAUTH2_STEP1.png)

![`Restream.IO` OAuth2 scopes - s2](./documentation/images/oauth2/restream/POKUS_RESTREAM_IO_OAUTH2_STEP2.png)

Here are the scopes :

```JavaScript
/****
 *
 * ------------------------------ - - - - -
 * ------------------------------ - - - - -
 *
 * ---->>>  pokus permissions:
 * ---->>>     -  Read your account profile
 * ---->>>     -  Read your channel information
 * ---->>>     -  Read your webchat messages
 * ---->>>     -  Post messages to your webchat on your behalf
 * ---->>>     -  Write your channel information
 * ---->>>     -  Read your account stream key
 *
 * ------------------------------ - - - - -
 * ------------------------------ - - - - -
 *
 **/
```

### The `S.R.I.` of a JavaScript File


* For `GNU/Linux` :

```bash

export JS_FILE_PATH=`$(pwd)/src/static/auth/oauth2/google/success/index.js`
cat ${JS_FILE_PATH} | openssl dgst -sha384 -binary | openssl base64 -A
```

* For `Mac OS` :

```bash
export JS_FILE_PATH=`$(pwd)/src/static/auth/oauth2/google/success/index.js`
shasum -b -a 384 ${JS_FILE_PATH} | awk '{ print $1 }' | xxd -r -p | base64
```


Example with a file of this project :


```bash
export JS_FILE_PATH=$(pwd)/src/static/auth/oauth2/google/success/index.js
shasum -b -a 384 ${JS_FILE_PATH} | awk '{ print $1 }' | xxd -r -p | base64 -
```

Gives this std output :

```bash
bash-3.2$ export JS_FILE_PATH=$(pwd)/src/static/auth/oauth2/google/success/index.js
bash-3.2$ shasum -b -a 384 ${JS_FILE_PATH} | awk '{ print $1 }' | xxd -r -p | base64 -
wa9YVYzVIfzkaZ8RGXUn+63I58zqVsO1qC4Ao+PAJfOck42XRC5glGCnKtBPaW0Q
```


## Pokuq Box Http

### Cookies

Express JS Cookies :
* we need to manage precise Date time,
* so we use joda time just like in java https://js-joda.github.io/js-joda/

And that works great, look at the HTTP Session Cookie :


![Http Sssion Cookie Epxiry](./documentation/images/http/cookie/pokus_http_cookies_expiry.png)


There as you can see i set the expiry time to be set 2 minutes after Now (look at the winston logs) :
* does this mean that HTTP Session will ewpire after 2 minutes ?
* No, session is a server side concept, so i will set expiry at 3 minutes after now, for HTTP session, and :
  * the wookie will expire a first time after 2 minutes, be re-issued by the express sesion middleware
  * and after 1 more minute, the session should expire, and the user forced to login again if he di not check the "keep me logged in" option
  * Ok, so actually what's the use of the pokus cookie ? a question to be answered later.


### HTTP Sessions

https://expressjs.com/en/resources/middleware/session.html

I waqn toi b e able to configure for each Http session :

* when it expires
*

## References

* https://www.passportjs.org/concepts/authentication/http-bearer/
* https://www.youtube.com/watch?v=Q0a0594tOrc
* https://blog.logrocket.com/documenting-your-express-api-with-swagger/
* Google Developer Console to create the OAuth2 app for Google Auth. : https://console.cloud.google.com/
* https://www.helpnetsecurity.com/2019/04/26/securing-mongo-express-web-administrative-interfaces/
* https://docs.docker.com/engine/swarm/secrets/
* https://github.com/mongo-express/mongo-express-docker/issues/74
* https://docs.docker.com/engine/swarm/secrets/#defining-and-using-secrets-in-compose-files
* https://www.npmjs.com/package/express-winston
* https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
* https://www.youtube.com/watch?v=h4A0-53Olm4
* https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
*  MongoDB auto increment PKs : https://www.mongodb.com/developer/article/triggers-tricks-auto-increment-fields/?_ga=2.90839762.995010974.1643718120-390222689.1643718118
* https://mongoosejs.com/docs/queries.html
* https://mongoosejs.com/docs/tutorials/query_casting.html
* async functions and REST API in Expressjs :
  * https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
  * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
* https://www.npmjs.com/package/@collegedunia/newman-mocha
* https://www.npmjs.com/package/newman-reporter-htmlextra-and-perf
* https://www.npmjs.com/package/@decathlon/newman-reporter-pullrequest-decorator
* https://stackabuse.com/get-query-strings-and-parameters-in-express-js/
* https://masteringjs.io/tutorials/mongoose/find-like
* Restream API Oauth2 scopes :
  * https://developers.restream.io/docs#upcoming-events, see the note `Required scopes: stream.read` below setion title
  * https://developers.restream.io/docs#in-progress-events, see the note `Required scopes: stream.read` below section title
  * I am almost sure that i can get all HTTP Links to all currently runing livestreaming, on all external platforms like twitch etc... using this Restream REST API endpoint :
    * https://developers.restream.io/docs#event
    * and especially there, in the JSon response, i am interested in the `.destinations[0].externalUrl` field
    * if there are several destinations, i will loop ,over the array to get all external urls
    * So basically :
      * I will use the two endpoints _"In Progress Events"_ and _"Upcoming Events"_  , to detect if a livestream has started (and maybe webhhoks ?). Goal is to determine the ID of the event we want to promote
      * then I query Restream REST API to get all external URLs,
      * and finally :
        * deploy the website with updated livestream links,
        * send all the links with a discord bot, to discord channels (for all people who added the discord bot to their servers
        * send a new post on all socials (hackernoon etc etc)
* https://www.npmjs.com/package/mongoose-findorcreate
* https://www.passportjs.org/packages/passport-oauth2/
* provision your own OAuth2 service with custom scopes (authorzations for APIs) :
  * https://github.com/jaredhanson/oauth2orize
  * I must try and use this... : and it can also provide OIDC ....
  * Ok what I wanna know, is how to add `OIDC` auth and Bearer Token authentication, and at the same time, manage permissions per user, per OAuth2 "_application_"
* Express JS and cache control :
  * https://regbrain.com/article/cache-headers-express-js
  * https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
* https://github.com/mde/ejs/issues/151#issuecomment-212607792
* https://blog.logrocket.com/documenting-your-express-api-with-swagger/
* https://expressjs.com/en/guide/using-middleware.html#middleware.router
* I must replace the PUT http method, by the patch. PUT is designed for sending a whole file as a blob.
* Managing multiple MongoDb Connections
