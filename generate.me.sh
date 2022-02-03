#!/bin/bash

# ---
mkdir hugo-starter-node/ || exit 3
cd hugo-starter-node/
git init
touch README.md
npm init --yes
atom .
npm install -g npm
npm i --save-dev toml@3.0.0
npm i -s bulma@0.9.3 concat-stream@2.0.0

export HUGO_PROJECT_NAME="hugo-demo"

cat <<EOF > ./package.json
{
  "name": "${HUGO_PROJECT_NAME}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "help": "echo \"set OS_DISTRIB to either 'macos' or 'linux'\" ",
    "spawn": "echo \"spawn up new hugo project from Hugo theme\" && export OS_DISTRIB=${OS_DISTRIB:-'macos'} && ./.npm.scripts/${OS_DISTRIB}/spawn.sh",
    "clean": "echo \"cleaning hugo project\" && export OS_DISTRIB=${OS_DISTRIB:-'macos'} && ./.npm.scripts/${OS_DISTRIB}/clean.sh",
    "parse-hugo-them-toml": "node .npm.scripts/toml-parser.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bulma": "^0.9.3",
    "concat-stream": "^2.0.0",
    "toml": "^3.0.0"
  }
}

EOF




git clone  git@github.com:Doctothon/huugo-demo.git .

touch ./README.md && git add -A && git commit -m "init the git flow" && git push -u origin master

git flow init --defaults

git push -u origin --all

git flow feature start init-hugo && git push -u origin HEAD

export COMMIT_MESSAGE="adding npm scripts"
git add -A && git commit -m "${COMMIT_MESSAGE}" && git push -u origin HEAD

# https://github.com/zerostaticthemes/hugo-winston-theme
export HUGO_THEME_CHOICE="git@github.com:zerostaticthemes/hugo-winston-theme.git"
mkdir -p ./.npm.scripts/macos/
mkdir -p ./.npm.scripts/linux/

cat <<EOF>./.npm.scripts/macos/clean.sh
#!/bin/bash

# ---

if [ -d content/ ]; then
  rm -fr content/
fi;

if [ -d data/ ]; then
  rm -fr data/
fi;

if [ -d static/ ]; then
  rm -fr static/
fi;

if [ -d assets/ ]; then
  rm -fr assets/
fi;

if [ -d layouts/ ]; then
  rm -fr layouts/
fi;

if [ -d resources/ ]; then
  rm -fr resources/
fi;

if [ -d themes/ ]; then
  rm -fr themes/
fi;

if [ -f config.toml ]; then
  rm config.toml
fi;


echo 'Hugo project cleaned!'

EOF

cat <<EOF>./.npm.scripts/macos/spawn.sh
#!/bin/bash
export pokusshields_ENV=\${pokusshields_ENV:-"staging"}
source .${pokusshields_ENV}.env
# export HUGO_THEME_GIT_SSH=\${HUGO_THEME_GIT_SSH:-"git@github.com:pokus-shields/hugo-theme-grayscale.git"}
# export HUGO_THEME_GIT_SSH=\${HUGO_THEME_GIT_SSH:-"git@github.com:runningstream/hugograyscale.git"}
# export HUGO_THEME_GIT_SSH=\${HUGO_THEME_GIT_SSH:-"git@github.com:zwbetz-gh/cupper-hugo-theme.git"}
export HUGO_THEME_GIT_SSH=\${HUGO_THEME_GIT_SSH:-"${HUGO_THEME_CHOICE}"}

export HUGO_THEME_VERSION="1.1.0"
export HUGO_THEME_VERSION="2.9.2"
export HUGO_THEME_VERSION="2.5.0"
export HUGO_THEME_VERSION="master"

if [ "x\${HUGO_BASE_URL}" == "x" ]; then
  export HUGO_BASE_URL="http://127.0.0.1:1313"
  echo "the HUGO_BASE_URL env. var. is not defined"
  echo " -->> falling back to default value HUGO_BASE_URL=[${HUGO_BASE_URL}] "

  # echo "set the HUGO_BASE_URL env. var.n, and re-run npm run spawn"
  # exit 7
fi;

if [ "x${OS_DISTRIB}" == "x" ]; then
  export OS_DISTRIB="linux"
  echo "the OS_DISTRIB env. var. is not defined"
  echo " -->> falling back to default value OS_DISTRIB=[${OS_DISTRIB}] "

  # echo "set the HUGO_BASE_URL env. var.n, and re-run npm run spawn"
  # exit 7
fi;





# ---
export TEMP_SPAWN_HOME=$(mktemp -d -t "TEMP_SPAWN_HOME-XXXXXXXXXX")
echo "TEMP_SPAWN_HOME is now : [${TEMP_SPAWN_HOME}]"
git clone ${HUGO_THEME_GIT_SSH} ${TEMP_SPAWN_HOME}
export WHERE_AMI=$(pwd)
cd ${TEMP_SPAWN_HOME}
git checkout ${HUGO_THEME_VERSION}

cd ${WHERE_AMI}
# rm -fr ${WHERE_AMI}/.git/
mkdir content/
mkdir data/
mkdir static/
mkdir assets/
mkdir layouts/
mkdir resources/


# cp -rT ${TEMP_SPAWN_HOME}/content ./content
cp -fR ${TEMP_SPAWN_HOME}/content/* ./content/

# cp -rT ${TEMP_SPAWN_HOME}/data ./data
cp -fR ${TEMP_SPAWN_HOME}/data/* ./data/

# cp -rT ${TEMP_SPAWN_HOME}/static ./static
cp -fR ${TEMP_SPAWN_HOME}/static/* ./static/

# cp -rT ${TEMP_SPAWN_HOME}/assets ./assets
cp -fR ${TEMP_SPAWN_HOME}/assets/* ./assets/

# cp -rT ${TEMP_SPAWN_HOME}/layouts ./layouts
cp -fR ${TEMP_SPAWN_HOME}/layouts/* ./layouts/

# cp -rT ${TEMP_SPAWN_HOME}/resources ./resources
cp -fR ${TEMP_SPAWN_HOME}/resources/* ./resources/


if [ -d ${TEMP_SPAWN_HOME}/exampleSite ]; then
  cp ${TEMP_SPAWN_HOME}/exampleSite/config.toml .
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/content ./content
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/content/* ./content/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/data ./data
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/data/* ./data/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/static ./static
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/static/* ./static/
  cp ${TEMP_SPAWN_HOME}/exampleSite/assets/custom-theme.scss ./assets
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/content ./content
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/content/* ./content/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/assets ./assets
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/assets/* ./assets/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/layouts ./layouts
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/layouts/* ./layouts/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/resources ./resources
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/resources/* ./resources/
fi;



if [ -d ${TEMP_SPAWN_HOME}/website ]; then
  cp ${TEMP_SPAWN_HOME}/website/config.toml .
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/content ./content
  cp -fR ${TEMP_SPAWN_HOME}/website/content/* ./content/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/data ./data
  cp -fR ${TEMP_SPAWN_HOME}/website/data/* ./data/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/static ./static
  cp -fR ${TEMP_SPAWN_HOME}/website/static/* ./static/
  cp ${TEMP_SPAWN_HOME}/website/assets/custom-theme.scss ./assets
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/content ./content
  cp -fR ${TEMP_SPAWN_HOME}/website/content/* ./content/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/assets ./assets
  cp -fR ${TEMP_SPAWN_HOME}/website/assets/* ./assets/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/layouts ./layouts
  cp -fR ${TEMP_SPAWN_HOME}/website/layouts/* ./layouts/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/resources ./resources
  cp -fR ${TEMP_SPAWN_HOME}/website/resources/* ./resources/
fi;



# echo '' >> ./config.toml
# echo '[params.reveal_hugo]' >> ./config.toml
# echo 'custom_theme = "assets/custom-theme.scss"' >> ./config.toml
# echo 'custom_theme_compile = true' >> ./config.toml

echo '' >> ./config.toml
echo '' >> ./config.toml
echo '[reveal_hugo.custom_theme_options]' >> ./config.toml
echo 'targetPath = "assets/custom-theme.css"' >> ./config.toml
echo 'enableSourceMap = true' >> ./config.toml


export TOML_FILE_PATH=${TEMP_SPAWN_HOME}/theme.toml
echo "TEMP_SPAWN_HOME is now : [${TEMP_SPAWN_HOME}]" | tee -a ./.npm.scripts/spwn.logs
echo "TOML_FILE_PATH is : [${TOML_FILE_PATH}]" | tee -a ./.npm.scripts/spwn.logs

npm run parse-hugo-them-toml | tee -a ${TEMP_SPAWN_HOME}/hugo.theme.to.json

# cat ${TEMP_SPAWN_HOME}/hugo.theme.to.json | jq .name
# cat ./.npm.scripts/hugo.theme.to.json  | jq .name | awk -F '"' '{print $2}'
cat ./.npm.scripts/${OS_DISTRIB}/hugo.theme.to.json  | jq .name | awk -F '"' '{print $2}' | tr '[:upper:]' '[:lower:]' | sed 's# #-#g'

# export HUGO_THEME_NAME=$(cat ${TEMP_SPAWN_HOME}/hugo.theme.to.json | jq .name)
export HUGO_THEME_NAME=$(cat ./.npm.scripts/${OS_DISTRIB}/hugo.theme.to.json  | jq .name | awk -F '"' '{print $2}' | tr '[:upper:]' '[:lower:]' | sed 's# #-#g')

echo "According [theme.toml], the hugo theme name is : [${HUGO_THEME_NAME}]" | tee -a ./.npm.scripts/spwn.logs

mkdir -p themes/${HUGO_THEME_NAME}
# cp -rT ${TEMP_SPAWN_HOME} ./themes/${HUGO_THEME_NAME}
cp -fR ${TEMP_SPAWN_HOME}/* ./themes/${HUGO_THEME_NAME}/
# cp -fR ${TEMP_SPAWN_HOME}/.* ./themes/${HUGO_THEME_NAME}/


# That's for hugo theme which have a nodejs / npm package project structure
if [ -f ./package.json ]; then
  cd ./themes/${HUGO_THEME_NAME}
  # sudo npm i -g node-sass || true
  npm i
  # npm run build || true
  # npm build || true
  # npm start
  cd  ../..
fi;

sudo npm i -g sass

export BULMA_VERSION=0.9.3
npm i bulma@${BULMA_VERSION}
if [ -d assets/bulma/ ]; then
  echo "# --- # ---"
  rm -fr assets/bulma/
  mkdir -p  assets/bulma/
fi;
cp -fR ./node_modules/bulma/* ./assets/bulma/
npm remove bulma@${BULMA_VERSION}


sed "s#baseURL =.*#baseURL = \"${HUGO_BASE_URL}\"#g" ./config.toml > ./config.temp.toml
cat ./config.temp.toml > ./config.toml
rm ./config.temp.toml

sed "s#theme =.*#theme = \"${HUGO_THEME_NAME}\"#g" ./config.toml > ./config.temp.toml
cat ./config.temp.toml > ./config.toml
rm ./config.temp.toml


# themesDir = "../.."
# theme = "hugo-whisper-theme"


echo "# ----------- AVANT SED"
echo "DEBUG : ./config.toml"
ls -alh ./config.toml
echo "DEBUG : ./config.toml | grep themesdir"
cat ./config.toml | grep themesdir


sed "s#themesDir.*=.*#themesDir = \"./themes\"#g" ./config.toml > ./config.temp.toml
cat ./config.temp.toml > ./config.toml
rm ./config.temp.toml
sed "s#themesdir.*=.*#themesdir = \"./themes\"#g" ./config.toml > ./config.temp.toml
cat ./config.temp.toml > ./config.toml
rm ./config.temp.toml


echo "# ----------- APRÈS SED"
echo "DEBUG : ./config.toml"
ls -alh ./config.toml
echo "DEBUG : ./config.toml | grep themesdir"
cat ./config.toml | grep themesdir
echo "DEBUG : ./config.toml | grep themesDir"
cat ./config.toml | grep themesDir


cat <<EOF > ./addon.config.yml
[[module.imports]]
  path = "github.com/jgthms/bulma"
  disable = false
  # [[module.imports.mounts]]
    # source = "."
    # target = "assets/sass"
  [[module.imports.mounts]]
    source = "."
    target = "assets/bulma"
EOF
echo '' | tee -a ./config.toml
echo '# --- # --- ' | tee -a ./config.toml
echo '# Addon to us Bulma as integrated SCSS Processor' | tee -a ./config.toml
echo '' | tee -a ./config.toml

cat ./addon.config.yml | tee -a ./config.toml

rm ./addon.config.yml

rm -fr ./themes/${HUGO_THEME_NAME}/.git/

export PATH=$PATH:/usr/local/go/bin && go version

echo "# ----------- AVANT MINIFY"
# hugo --gc --minify
# hugo --gc --minify --buildFuture
echo "# ----------- APRÈS MINIFY"

hugo
# export PATH=$PATH:/usr/local/go/bin && go version && hugo serve -bttp://127.0.0.1:1313
echo "export HUGO_BASE_URL=\"${HUGO_BASE_URL}\""
echo "export HUGO_THEME_NAME=\"${HUGO_THEME_NAME}\""
exit 0

EOF

cat <<EOF>./.npm.scripts/linux/clean.sh
#!/bin/bash

# ---

if [ -d content/ ]; then
  rm -fr content/
fi;

if [ -d data/ ]; then
  rm -fr data/
fi;

if [ -d static/ ]; then
  rm -fr static/
fi;

if [ -d assets/ ]; then
  rm -fr assets/
fi;

if [ -d layouts/ ]; then
  rm -fr layouts/
fi;

if [ -d resources/ ]; then
  rm -fr resources/
fi;

if [ -d themes/ ]; then
  rm -fr themes/
fi;

if [ -f config.toml ]; then
  rm config.toml
fi;

EOF

cat <<EOF>./.npm.scripts/linux/spawn.sh
#!/bin/bash
export radiojaune_ENV=${radiojaune_ENV:-"staging"}
source .${radiojaune_ENV}.env
# export HUGO_THEME_GIT_SSH=${HUGO_THEME_GIT_SSH:-"git@github.com:radio-jaune/hugo-theme-grayscale.git"}
export HUGO_THEME_GIT_SSH=${HUGO_THEME_GIT_SSH:-"git@github.com:runningstream/hugograyscale.git"}

export HUGO_THEME_VERSION="1.1.0"
export HUGO_THEME_VERSION="2.9.2"
export HUGO_THEME_VERSION="2.5.0"
export HUGO_THEME_VERSION="master"

if [ "x${HUGO_BASE_URL}" == "x" ]; then
  echo "the HUGO_BASE_URL env. var. is not defined, stopping the hugo project spawn"
  echo "set the HUGO_BASE_URL env. var.n, and re-run npm run spawn"
  exit 7
fi;

# ---
export TEMP_SPAWN_HOME=$(mktemp -d -t "TEMP_SPAWN_HOME-XXXXXXXXXX")
echo "TEMP_SPAWN_HOME is now : [${TEMP_SPAWN_HOME}]"
git clone ${HUGO_THEME_GIT_SSH} ${TEMP_SPAWN_HOME}
export WHERE_AMI=$(pwd)
cd ${TEMP_SPAWN_HOME}
git checkout ${HUGO_THEME_VERSION}

cd ${WHERE_AMI}
# rm -fr ${WHERE_AMI}/.git/
mkdir content/
mkdir data/
mkdir static/
mkdir assets/
mkdir layouts/
mkdir resources/


# cp -rT ${TEMP_SPAWN_HOME}/content ./content
cp -fR ${TEMP_SPAWN_HOME}/content/* ./content/

# cp -rT ${TEMP_SPAWN_HOME}/data ./data
cp -fR ${TEMP_SPAWN_HOME}/data/* ./data/

# cp -rT ${TEMP_SPAWN_HOME}/static ./static
cp -fR ${TEMP_SPAWN_HOME}/static/* ./static/

# cp -rT ${TEMP_SPAWN_HOME}/assets ./assets
cp -fR ${TEMP_SPAWN_HOME}/assets/* ./assets/

# cp -rT ${TEMP_SPAWN_HOME}/layouts ./layouts
cp -fR ${TEMP_SPAWN_HOME}/layouts/* ./layouts/

# cp -rT ${TEMP_SPAWN_HOME}/resources ./resources
cp -fR ${TEMP_SPAWN_HOME}/resources/* ./resources/


if [ -d ${TEMP_SPAWN_HOME}/exampleSite ]; then
  cp ${TEMP_SPAWN_HOME}/exampleSite/config.toml .
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/content ./content
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/content/* ./content/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/data ./data
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/data/* ./data/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/static ./static
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/static/* ./static/
  cp ${TEMP_SPAWN_HOME}/exampleSite/assets/custom-theme.scss ./assets
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/content ./content
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/content/* ./content/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/assets ./assets
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/assets/* ./assets/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/layouts ./layouts
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/layouts/* ./layouts/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/resources ./resources
  cp -fR ${TEMP_SPAWN_HOME}/exampleSite/resources/* ./resources/
fi;



if [ -d ${TEMP_SPAWN_HOME}/website ]; then
  cp ${TEMP_SPAWN_HOME}/website/config.toml .
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/content ./content
  cp -fR ${TEMP_SPAWN_HOME}/website/content/* ./content/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/data ./data
  cp -fR ${TEMP_SPAWN_HOME}/website/data/* ./data/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/static ./static
  cp -fR ${TEMP_SPAWN_HOME}/website/static/* ./static/
  cp ${TEMP_SPAWN_HOME}/website/assets/custom-theme.scss ./assets
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/content ./content
  cp -fR ${TEMP_SPAWN_HOME}/website/content/* ./content/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/assets ./assets
  cp -fR ${TEMP_SPAWN_HOME}/website/assets/* ./assets/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/layouts ./layouts
  cp -fR ${TEMP_SPAWN_HOME}/website/layouts/* ./layouts/
  # cp -rT ${TEMP_SPAWN_HOME}/exampleSite/resources ./resources
  cp -fR ${TEMP_SPAWN_HOME}/website/resources/* ./resources/
fi;



# echo '' >> ./config.toml
# echo '[params.reveal_hugo]' >> ./config.toml
# echo 'custom_theme = "assets/custom-theme.scss"' >> ./config.toml
# echo 'custom_theme_compile = true' >> ./config.toml

echo '' >> ./config.toml
echo '' >> ./config.toml
echo '[reveal_hugo.custom_theme_options]' >> ./config.toml
echo 'targetPath = "assets/custom-theme.css"' >> ./config.toml
echo 'enableSourceMap = true' >> ./config.toml


export TOML_FILE_PATH=${TEMP_SPAWN_HOME}/theme.toml
echo "TEMP_SPAWN_HOME is now : [${TEMP_SPAWN_HOME}]"
echo "TOML_FILE_PATH is : [${TOML_FILE_PATH}]"
npm run parse-hugo-them-toml | tee -a ${TEMP_SPAWN_HOME}/hugo.theme.to.json

# cat ${TEMP_SPAWN_HOME}/hugo.theme.to.json | jq .name
# cat ./.npm.scripts/hugo.theme.to.json  | jq .name | awk -F '"' '{print $2}'
cat ./.npm.scripts/hugo.theme.to.json  | jq .name | awk -F '"' '{print $2}' | tr '[:upper:]' '[:lower:]' | sed 's# #-#g'

# export HUGO_THEME_NAME=$(cat ${TEMP_SPAWN_HOME}/hugo.theme.to.json | jq .name)
export HUGO_THEME_NAME=$(cat ./.npm.scripts/hugo.theme.to.json  | jq .name | awk -F '"' '{print $2}' | tr '[:upper:]' '[:lower:]' | sed 's# #-#g')

echo "According [theme.toml], the hugo theme name is : [${HUGO_THEME_NAME}]"
mkdir -p themes/${HUGO_THEME_NAME}
cp -rT ${TEMP_SPAWN_HOME} ./themes/${HUGO_THEME_NAME}

# that's for hugo theme which have a nodejs / npm package project structure
if [ -f ./package.json ]; then
  cd ./themes/${HUGO_THEME_NAME}
  # sudo npm i -g node-sass || true
  npm i
  # npm run build || true
  # npm build || true
  # npm start
  cd  ../..
fi;

sudo npm i -g sass

export BULMA_VERSION=0.9.3
npm i bulma@${BULMA_VERSION}
if [ -d assets/bulma/ ]; then
  echo "# --- # ---"
  rm -fr assets/bulma/
  mkdir -p  assets/bulma/
fi;
cp -fR ./node_modules/bulma/* ./assets/bulma/
npm remove bulma@${BULMA_VERSION}

sed -i "s#baseURL =.*#baseURL = \"${HUGO_BASE_URL}\"#g" ./config.toml
sed -i "s#theme =.*#theme = \"${HUGO_THEME_NAME}\"#g" ./config.toml

echo "# ----------- AVANT SED"
echo "DEBUG : ./config.toml"
ls -alh ./config.toml
echo "DEBUG : ./config.toml | grep themesdir"
cat ./config.toml | grep themesdir
sed -i "s#themesDir.*=.*#themesDir = \"./themes\"#g" ./config.toml
sed -i "s#themesdir.*=.*#themesdir = \"./themes\"#g" ./config.toml
echo "# ----------- APRÈS SED"
echo "DEBUG : ./config.toml"
ls -alh ./config.toml
echo "DEBUG : ./config.toml | grep themesdir"
cat ./config.toml | grep themesdir


cat <<EOF > ./addon.config.yml
[[module.imports]]
  path = "github.com/jgthms/bulma"
  disable = false
  # [[module.imports.mounts]]
    # source = "."
    # target = "assets/sass"
  [[module.imports.mounts]]
    source = "."
    target = "assets/bulma"
EOF
echo '' | tee -a ./config.toml
echo '# --- # --- ' | tee -a ./config.toml
echo '# Addon to us Bulma as integrated SCSS Processor' | tee -a ./config.toml
echo '' | tee -a ./config.toml

cat ./addon.config.yml | tee -a ./config.toml

rm ./addon.config.yml

rm -fr ./themes/${HUGO_THEME_NAME}/.git/

export PATH=$PATH:/usr/local/go/bin && go version

echo "# ----------- AVANT MINIFY"
# hugo --gc --minify
# hugo --gc --minify --buildFuture
echo "# ----------- APRÈS MINIFY"

hugo
# export PATH=$PATH:/usr/local/go/bin && go version && hugo serve -bttp://127.0.0.1:1313

EOF

chmod +x ./.npm.scripts/linux/*.sh
chmod +x ./.npm.scripts/macos/*.sh
