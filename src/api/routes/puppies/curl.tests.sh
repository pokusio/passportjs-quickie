#!/bin/bash







#### Test the API Endpoint : [Users]

# Finally, you can run the following commands to test all REST API Endpoints :

#################################################################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # --  CRUD CREATE #########################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
#################################################################################



## POST /api/v1/pupppies
#
export MY_PUPPIES="{ \
  \"cute_name\": \"cherry\", \
  \"description\": \"shes a such a good dog, always warm welcoming home\", \
  \"is_female\": true, \
  \"color\": \"blue\" \
}"

echo "${MY_PUPPIES}" | jq .

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPIES}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPIES}"

export MY_PUPPIES="{ \
  \"cute_name\": \"rollercoaster\", \
  \"description\": \"hes a  bit crazy, but all in all a real good dog, always definding home\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPIES}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPIES}"


export MY_PUPPIES="{ \
  \"cute_name\": \"madison\", \
  \"description\": \"shes a  bit crazy, but madison all in all a real good dog, always cheerful\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPIES}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPIES}"


export MY_PUPPIES="{ \
  \"cute_name\": \"grace\", \
  \"description\": \"shes very quiet, an eats a lot :), plus she's very esay going with children\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPIES}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPIES}"


export MY_PUPPIES="{ \
  \"cute_name\": \"kelly\", \
  \"description\": \"she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPIES}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPIES}"



export MY_PUPPIES="{ \
  \"cute_name\": \"charlie\", \
  \"description\": \"another dog i added fr tests.\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPIES}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPIES}"



export MY_PUPPIES="{ \
  \"cute_name\": \"china\", \
  \"description\": \"another yellow dog named china i added fr tests.\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPIES}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPIES}"

# try adding 2 puppies with same name, but the other one has another description
export MY_PUPPIES="{ \
  \"cute_name\": \"china\", \
  \"description\": \"that's the other one that has a different description, znd which will never be added n saved to the database. Will throw a Monggose Exception.\", \
  \"is_female\": true, \
  \"color\": \"yellow\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPIES}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPIES}"


cat <<EOF >./example.output.of.case.logs
****
error:   /*****# [createUser = ()] Saving User FAILED!!!
error:   /*************************************************************************
error:   -----------------------------------------------------------------------------
error:   An error occured during the execution of  [createUser = () => {] :
error:   E11000 duplicate key error collection: pokus.puppies index: cute_name_1 dup key: { cute_name: "china" }
error:   -----------------------------------------------------------------------------
EOF

echo "-----------------------------------------------------------------------------"
echo "  Now you should have an output like this : "
echo "-----------------------------------------------------------------------------"
cat ./example.output.of.case.logs
echo "-----------------------------------------------------------------------------"



#################################################################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # --  CRUD RETRIEVE #########################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
#################################################################################


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
export PUPPY_ID="6200c66f301098606e551958"
export POKUS_QUERY_PARAMS="puppy_id=${PUPPY_ID}&search=&female=true&color=yellow" && curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"



#################################################################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # --  CRUD UPDATE #########################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
#################################################################################

# test updating a puppy :


# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# 62005b5b827d6996ec40a087 : see [docker/run.template/mongo/mongo-init.js]

export PUPPY_ID="62007bfa1d6266b54970d9c8"
export WRONG_PUPPY_ID="92005b5b827d6996ec40a089"
export MY_PUPPIES="{ \
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

export MY_PUPPIES="{ \
  \"puppy_id\": \"${WRONG_PUPPY_ID}\", \
  \"cute_name\": \"kelly updated\", \
  \"description\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"color\": \"green\" \
}"
# - #
# Then try and update the puppy that does not exist
curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPIES}" -X PUT -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPIES}"


## Then test successfully updating a puppy

export PUPPY_ID="6200e78397424935dbc6275e"
export MY_PUPPIES="{ \
  \"puppy_id\": \"${PUPPY_ID}\", \
  \"cute_name\": \"kelly updated\", \
  \"description\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"color\": \"green\" \
}"

export POKUS_QUERY_PARAMS="puppy_id=${PUPPY_ID}&search=&female=true&color=yellow"

curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"

curl -iv http://127.0.0.1:9099/api/v1/puppies -d "${MY_PUPPIES}" -X PUT -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/puppies -d ${MY_PUPPIES}"

curl -iv "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/puppies?${POKUS_QUERY_PARAMS}"





#################################################################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # --  CRUD DELETE #########################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
#################################################################################

# To test deleting puppies :


export PUPPY_ID="6200e78397424935dbc6275e"
export WRONG_PUPPY_ID="92005b5b827d6996ec40a089"

# + -> Should fail (to test the error mgmt behavior) :
curl -X DELETE -iv "http://127.0.0.1:9099/api/v1/puppies?puppy_id=${WRONG_PUPPY_ID}"
# + -> Should succeed :
curl -X DELETE -iv "http://127.0.0.1:9099/api/v1/puppies?puppy_id=${PUPPY_ID}"
