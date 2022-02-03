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
docker-compose up -d mongo
# ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> ---> --->
# ---> Then go to http://0.0.0.0:8084/  for the MongoDB WebUI

# To restart with fresh empty database :
# docker-compose down --volumes && docker-compose up --force-recreate -d && docker-compose logs -f mongo_webui | more

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
export DOGGIE="{ \
  \"cute_name\": \"cherry\", \
  \"description\": \"shes a such a good dog, always warm welcoming home\", \
  \"is_female\": true \
}"

echo "${DOGGIE}" | jq .

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${DOGGIE}" -X POST -H "Accept: application/json"

export DOGGIE="{ \
  \"cute_name\": \"rollercoaster\", \
  \"description\": \"hes a  bit crazy, but all in all a real good dog, always definding home\", \
  \"is_female\": true \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${DOGGIE}" -X POST -H "Accept: application/json"


#########################################
## GET /api/v1/pupppies
#
curl -iv http://127.0.0.1:9099/api/v1/puppies -X GET -H "Accept: application/json"

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

# I first start the mong database only (not mongo express)
docker-compose up -d mongo

# then i run a standalone container, connecting it into the same docker network, of type bridge.

docker stop jblm && docker rm jblm

docker run -itd --name jblm --restart always -e ME_CONFIG_MONGODB_URL="mongodb://pokus:pokus@mongo.pok-us.io:27017/pokus?ssl=false" --add-host "mongo.pok-us.io:192.168.82.6" --network hugo-starter-node_mongo_net --entrypoint "/bin/sh" debian


docker exec -it jblm bin -c "apt-get update -y && apt-get install -y iputils-ping"
docker exec -it jblm bin -c "ping -c 4 mongo"

docker stop jblm && docker rm jblm

# and to test running mongo-express as simply as possible, which works ! Go to http://0.0.0.0:8083/
docker run -it --name jblmn --rm -p 0.0.0.0:8083:8081 \
    --add-host "mongo.pok-us.io:192.168.82.6" \
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

## Testing database connection

```bash

docker run --name jbltest -itd --restart always mongo sh

docker exec -it jbltest sh -c "mongo --version"
docker exec -it jbltest sh -c "apt-get update -y && apt-get install -y iputils-ping"

export POKUSDB_USERNAME="user"
export POKUSDB_USERPWD="user"
export POKUSDB_NET_HOST="192.168.82.6"


export TEST_QUERY="mongo -u \"${POKUSDB_USERNAME}\" -p \"${POKUSDB_USERPWD}\" ${POKUSDB_NET_HOST} --authenticationDatabase \"admin\""


docker exec -it jbltest sh -c "${TEST_QUERY}"

# ===>>>
# ===>>>
# ===>>> Okay, so a first test with wrong user/pwd  involves authentication failed, that's good n expected.
# ===>>>
# ===>>>


# bash-3.2$ export POKUSDB_USERNAME="user"
# bash-3.2$ export POKUSDB_USERPWD="user"
# bash-3.2$ export POKUSDB_NET_HOST="192.168.82.6"
# bash-3.2$
# bash-3.2$
# bash-3.2$ export TEST_QUERY="mongo -u \"${POKUSDB_USERNAME}\" -p \"${POKUSDB_USERPWD}\" ${POKUSDB_NET_HOST} --authenticationDatabase \"admin\""
# bash-3.2$
# bash-3.2$
# bash-3.2$ docker exec -it jbltest sh -c "${TEST_QUERY}"
#
# MongoDB shell version v5.0.6
# connecting to: mongodb://192.168.82.6:27017/test?authSource=admin&compressors=disabled&gssapiServiceName=mongodb
# Error: Authentication failed. :
# connect@src/mongo/shell/mongo.js:372:17
# @(connect):2:6
# exception: connect failed
# exiting with code 1
# bash-3.2$


export POKUSDB_USERNAME="pokus"
export POKUSDB_USERPWD="pokus"
export POKUSDB_NET_HOST="192.168.82.6"
export POKUSDB_AUTH_DB="admin"


export TEST_QUERY="mongo -u \"${POKUSDB_USERNAME}\" -p \"${POKUSDB_USERPWD}\" ${POKUSDB_NET_HOST} --authenticationDatabase \"${POKUSDB_AUTH_DB}\""


docker exec -it jbltest sh -c "${TEST_QUERY}"

# and there we have an authentication success as the super dooper admin
```

Right, now i see one thing that i do not specify in my `mongoDbURI` : the authentication database. That's with i added the `?authSource=admin` query param in `mongoDbURI`.


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
