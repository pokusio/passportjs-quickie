#!/bin/bash
# Tested on :
# --> MAC OS
# --> Not yet on Debian (but should work right off)
# --


# One Test folder per ExpressJS Router (so it shoudl be mirroring the folder structure of src folder)
export API_ENDPOINTS="puppies virtualbox/machines virtualbox/disks virtualbox/snapshots"
export API_FLOWS="create_and_search_puppies manage_vm_snapshots"



finalDisplay () {
  echo "# --- --- --- "
  echo "# ---"
  echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
  echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
  echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
  echo " Add to your index.js / server.js :"
  echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
  echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
  echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
  for ENDPOINT in ${API_ENDPOINTS}
  do
    export TRAILING_FOLDER=$(echo "${ENDPOINT}" | awk -F '/' '{print $NF}')
    export TOP_FOLDER=$(echo "${ENDPOINT}" | awk -F '/' '{print $1}')
    export FIRST_LETTER=$(echo ${TRAILING_FOLDER:0:1})
    export FIRST_LETTER=$(echo ${FIRST_LETTER} | tr '[a-z]' '[A-Z]')
    export CHAR_NBR=$(echo ${#TRAILING_FOLDER})
    export AL_TRAILING_FOLDER=$(echo ${TRAILING_FOLDER:1:${CHAR_NBR}})
    export POKUS_ENDPOINT_ALIAS="${TOP_FOLDER}${FIRST_LETTER}${AL_TRAILING_FOLDER}"

    echo "  const ${POKUS_ENDPOINT_ALIAS}ApiEndpoint = require(\"./${ENDPOINT}/\")"
  done
  echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
  echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
}

generateTestsFolderStructure () {
  for ENDPOINT in ${API_ENDPOINTS}
  do
    echo " pokusbox endpoint ::   [${ENDPOINT}]  generation started"

    mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_C/
    mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_R/
    mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_U/
    mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_D/

    touch test/api/endpoint/${ENDPOINT}/CRUD_C/spec.newman.json
    touch test/api/endpoint/${ENDPOINT}/CRUD_C/env.newman.json
    touch test/api/endpoint/${ENDPOINT}/CRUD_R/spec.newman.json
    touch test/api/endpoint/${ENDPOINT}/CRUD_R/env.newman.json
    touch test/api/endpoint/${ENDPOINT}/CRUD_U/spec.newman.json
    touch test/api/endpoint/${ENDPOINT}/CRUD_U/env.newman.json
    touch test/api/endpoint/${ENDPOINT}/CRUD_D/spec.newman.json
    touch test/api/endpoint/${ENDPOINT}/CRUD_D/env.newman.json

    ls -alh ./.npm.scripts/tests/api/router/template/spec.taurus.newman.json || exit 3

    cat ./.npm.scripts/tests/api/router/template/spec.taurus.newman.json > test/api/endpoint/${ENDPOINT}/CRUD_C/spec.newman.json
    cat ./.npm.scripts/tests/api/router/template/spec.taurus.newman.json > test/api/endpoint/${ENDPOINT}/CRUD_R/spec.newman.json
    cat ./.npm.scripts/tests/api/router/template/spec.taurus.newman.json > test/api/endpoint/${ENDPOINT}/CRUD_U/spec.newman.json
    cat ./.npm.scripts/tests/api/router/template/spec.taurus.newman.json > test/api/endpoint/${ENDPOINT}/CRUD_D/spec.newman.json

    mkdir -p src/api/routers/${ENDPOINT}/
    touch src/api/routers/${ENDPOINT}/index.js
    echo " pokusbox endpoint ::   [${ENDPOINT}]  generation completed"
  done


  for API_FLOW in ${API_FLOWS}
  do
    echo " pokusbox endpoint ::   [${API_FLOWS}]  generation started"

    mkdir -p test/api/flows/${API_FLOW}/
    touch test/api/flows/${API_FLOW}/spec.newman.json
    touch test/api/flows/${API_FLOW}/env.newman.json
  done
}

generateSourceFolderStructure () {
  for ENDPOINT in ${API_ENDPOINTS}
  do
    echo " pokusbox endpoint ::   [${ENDPOINT}]  generation started"
    mkdir -p src/api/routers/${ENDPOINT}/
    touch src/api/routers/${ENDPOINT}/index.js
    cat ./.npm.scripts/tests/api/router/template/index.js > ./src/api/routers/${ENDPOINT}/index.js
    echo " pokusbox endpoint ::   [${ENDPOINT}]  generation completed"
  done

}


generateTestsFolderStructure
generateSourceFolderStructure
finalDisplay

exit 0

read -p "Confirm ? (y/Y) " POKUS_ANSWER
echo "POKUS_ANSWER=[${POKUS_ANSWER}]"






echo "# --- --- --- "
echo "# ---"
echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo " Add to your index.js / server.js :"
echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
for ENDPOINT in ${API_ENDPOINTS}
do
  export TRAILING_FOLDER=$(echo "${ENDPOINT}" | awk -F '/' '{print $NF}')
  export TOP_FOLDER=$(echo "${ENDPOINT}" | awk -F '/' '{print $1}')
  export FIRST_LETTER=$(echo ${TRAILING_FOLDER:0:1})
  export FIRST_LETTER=$(echo ${FIRST_LETTER} | tr '[a-z]' '[A-Z]')
  export CHAR_NBR=$(echo ${#TRAILING_FOLDER})
  export AL_TRAILING_FOLDER=$(echo ${TRAILING_FOLDER:1:${CHAR_NBR}})
  export POKUS_ENDPOINT_ALIAS="${TOP_FOLDER}${FIRST_LETTER}${AL_TRAILING_FOLDER}"

  echo "  const ${POKUS_ENDPOINT_ALIAS}ApiEndpoint = require("./${ENDPOINT}/")"
done
echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "# -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"










for ENDPOINT in ${API_FLOWS}
do
  echo " pokusbox endpoint ::   [${ENDPOINT}]  generation completed"
  mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_C/spec.newman.json
  mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_C/env.newman.json
  mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_R/spec.newman.json
  mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_R/env.newman.json
  mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_U/spec.newman.json
  mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_U/env.newman.json
  mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_D/spec.newman.json
  mkdir -p test/api/endpoint/${ENDPOINT}/CRUD_D/env.newman.json

  mkdir -p test/api/flows/${API_FLOW}/CRUD_D/env.newman.json
done


exit 0


#
# -- A few tests i made, for the record
#

export TEST_STR="Voyons voir celA"
# export TEST_STR1=${TEST_STR,,}
# export TEST_STR2=${TEST_STR^^}
export TEST_STR1=$(echo ${TEST_STR} | tr '[a-z]' '[A-Z]')
export TEST_STR2=$(echo ${TEST_STR} | tr '[A-Z]' '[a-z]')
# echo ${TEST_STR}| tr ':upper:'
# echo ${TEST_STR}| tr ':lower:'
echo ""
echo "-+--+--+--+--+--+--+------+--+--+--+---------------"
echo "    TEST_STR1=[${TEST_STR1}]"
echo "    TEST_STR2=[${TEST_STR2}]"
echo "--+--+--+--+-"
