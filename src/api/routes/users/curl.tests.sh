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
export MY_USER="{ \
  \"fullname\": \"linustorvalds\", \
  \"email\": \"linustorvalds@pok-us.io\", \
  \"short_intro\": \"hello, my name is Linus, I founded the GNU/Linux project, and gave girth to git.\", \
  \"is_female\": false, \
  \"birth_date\": \"07/18/1798\" \
}"

echo "${MY_USER}" | jq .

curl -iv http://127.0.0.1:9099/api/v1/users -d "${MY_USER}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/users -d ${MY_USER}"

export MY_USER="{ \
  \"fullname\": \"claymorehiker\", \
  \"email\": \"claymorehiker@gmail.com\", \
  \"short_intro\": \"hello, my name is Clay, I love working on frontend technologies, lke vue, angular, skeleton, sass/less, rxjs, mainly js stacks.\", \
  \"is_female\": false, \
  \"birth_date\": \"08/23/1821\" \
}"
curl -iv http://127.0.0.1:9099/api/v1/users -d "${MY_USER}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/users -d ${MY_USER}"


export MY_USER="{ \
  \"fullname\": \"kelsoasher\", \
  \"email\": \"kelsoasher@toonies.com\", \
  \"short_intro\": \"hello, my name is Kelso Asher, I am backedn dev. and love working with quarkus.io, golang mainly java and golang stacks.\", \
  \"is_female\": false, \
  \"birth_date\": \"02/11/1998\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/users -d "${MY_USER}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/users -d ${MY_USER}"

export MY_USER="{ \
  \"fullname\": \"kelsoasher\", \
  \"email\": \"kelsoasher@toonies.com\", \
  \"short_intro\": \"hello, my name is Kelso Asher, I am backedn dev. and love working with quarkus.io, golang mainly java and golang stacks.\", \
  \"is_female\": false, \
  \"birth_date\": \"02/11/1998\" \
}"

curl -iv http://127.0.0.1:9099/api/v1/users -d "${MY_USER}" -X POST -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/users -d ${MY_USER}"


cat <<EOF >./example.output.of.case.logs
****
error:   /*****# [createUser = ()] Saving User FAILED!!!
error:   /*************************************************************************
error:   -----------------------------------------------------------------------------
error:   An error occured during the execution of  [createUser = () => {] :
error:   E11000 duplicate key error collection: pokus.users index: fullname_1 dup key: { fullname: "china" }
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

export POKUS_QUERY_PARAMS="search=li" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"


# ---
# ---
# ---  with 'color', but no 'is_female' search criterias :
export POKUS_QUERY_PARAMS="search=ch&female=true" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"

# ---
# ---
# ---  with 'color', but no 'is_female' search criterias :
export POKUS_QUERY_PARAMS="search=ch&color=blue" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"

export POKUS_QUERY_PARAMS="search=cha"
curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"



# --->>> no 'color', but with 'is_female' search criterias :
export POKUS_QUERY_PARAMS="search=cha&female=false" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"

export POKUS_QUERY_PARAMS="search=cha&female=true" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"

export POKUS_QUERY_PARAMS="search=ch&female=true&color=yellow" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"

export POKUS_QUERY_PARAMS="search=&female=true&color=yellow" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"


# Get user by id
export USER_ID="62005b5b827d6996ec40a087"
export POKUS_QUERY_PARAMS="user_id=${USER_ID}&search=&female=true&color=yellow" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"



#################################################################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # --  CRUD UPDATE #########################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
#################################################################################

# test updating a user :


# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# 62005b5b827d6996ec40a087 : see [docker/run.template/mongo/mongo-init.js]

export USER_ID="62007bfa1d6266b54970d9c8"
export WRONG_USER_ID="92005b5b827d6996ec40a089"
export MY_USER="{ \
  \"user_id\": \"${USER_ID}\", \
  \"fullname\": \"kelly updated\", \
  \"description\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"color\": \"green\" \
}"

## Detect error cases first

export POKUS_QUERY_PARAMS="user_id=${WRONG_USER_ID}&search=&female=true&color=yellow"

# - #
# First check indeed there is no user with that id
curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"

export MY_USER="{ \
  \"user_id\": \"${WRONG_USER_ID}\", \
  \"fullname\": \"kelly updated\", \
  \"description\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"color\": \"green\" \
}"
# - #
# Then try and update the user that does not exist
curl -iv http://127.0.0.1:9099/api/v1/users -d "${MY_USER}" -X PUT -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/users -d ${MY_USER}"


## Then test successfully updating a user

export MY_USER="{ \
  \"user_id\": \"${USER_ID}\", \
  \"fullname\": \"kelly updated\", \
  \"description\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"color\": \"green\" \
}"

export POKUS_QUERY_PARAMS="user_id=${USER_ID}&search=&female=true&color=yellow"

curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"

curl -iv http://127.0.0.1:9099/api/v1/users -d "${MY_USER}" -X PUT -H "Accept: application/json" && echo "http://127.0.0.1:9099/api/v1/users -d ${MY_USER}"

curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"





#################################################################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # --  CRUD DELETE #########################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
#################################################################################

# To test deleting users :


export USER_ID="62007bfa1d6266b54970d9c8"
export WRONG_USER_ID="92005b5b827d6996ec40a089"

# + -> Should fail (to test the error mgmt behavior) :
curl -X DELETE -iv "http://127.0.0.1:9099/api/v1/users?user_id=${WRONG_USER_ID}"
# + -> Should succeed :
curl -X DELETE -iv "http://127.0.0.1:9099/api/v1/users?user_id=${USER_ID}"
