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
#    ?search=lia
#    ?search=lia&female=false
#    ?search=lia&female=false&email=gmail
#

export POKUS_QUERY_PARAMS="search=li" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"


# ---
# ---
# ---  with 'female', but no 'email' search criterias :
# expect : no results
export POKUS_QUERY_PARAMS="search=li&female=true" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"
# expect : one result, linus torvalds
export POKUS_QUERY_PARAMS="search=li&female=false" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"

# ---
# ---
# ---  with 'email', but no 'is_female' search criterias :
# expect : one result, linus torvalds
export POKUS_QUERY_PARAMS="search=li&email=a" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"
# expect : no results
export POKUS_QUERY_PARAMS="search=li&email=b" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"
# expect : one result, linus torvalds
export POKUS_QUERY_PARAMS="search=li&email=a"
curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"




# --->>> no 'email', but with 'is_female' search criterias :
# expect : one result, linus torvalds
export POKUS_QUERY_PARAMS="search=li&female=false" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"
# expect : no results
export POKUS_QUERY_PARAMS="search=li&female=true" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"
# expect : no results
export POKUS_QUERY_PARAMS="search=li&female=true&emailu" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"
# expect : one result, linus torvalds
export POKUS_QUERY_PARAMS="search=&female=false&email=u" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"


# Get user by id
# expect : "claymorehiker"
export USER_ID="6203c1f76be67686cb35eb35"
export POKUS_QUERY_PARAMS="user_id=${USER_ID}&search=&female=true&email=gmail" && curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"



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

export USER_ID="6203c1f76be67686cb35eb35"
export WRONG_USER_ID="92005b5b827d6996ec40a089"
export MY_USER="{ \
  \"user_id\": \"${USER_ID}\", \
  \"fullname\": \"kelly updated\", \
  \"short_intro\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"email\": \"rheiner@gmail.com\" \
}"

## Detect error cases first

export POKUS_QUERY_PARAMS="user_id=${WRONG_USER_ID}&search=&female=true&email=gmail"

# - #
# First check indeed there is no user with that id
# expect : no results
curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"

export MY_USER="{ \
  \"user_id\": \"${WRONG_USER_ID}\", \
  \"fullname\": \"kelly updated\", \
  \"short_intro\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"email\": \"kelly@gmail.com\" \
}"
# - #
# Then try and update the user that does not exist
# expect : response 404, ith json like :
# - #
# {
#  "message": "Pokus [PUT /api/v1/users], [updateUserById()]: the user of id [92005b5b827d6996ec40a089] does not exists in the database, so it cannot be updated to : {\n  \"user_id\": \"92005b5b827d6996ec40a089\",\n  \"fullname\": \"kelly updated\",\n  \"email\": \"kelly@gmail.com\",\n  \"short_intro\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\",\n  \"is_female\": \"true\",\n  \"birth_date\": \"01/01/1970\"\n}",
#  "user": {
#    "user_id": "92005b5b827d6996ec40a089",
#    "fullname": "kelly updated",
#    "email": "kelly@gmail.com",
#    "short_intro": "(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.",
#    "is_female": "true",
#    "birth_date": "01/01/1970"
#  }
#}
# - #

curl -iv http://127.0.0.1:9099/api/v1/users -d "${MY_USER}" -X PUT -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users -d ${MY_USER}"


## Then test successfully updating a user

export MY_USER="{ \
  \"user_id\": \"${USER_ID}\", \
  \"fullname\": \"kelly updated\", \
  \"short_intro\": \"(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.\", \
  \"is_female\": true, \
  \"email\": \"kelly@gmail.com\" \
}"

export POKUS_QUERY_PARAMS="user_id=${USER_ID}&search=&female=true&email=gmail"
# expect : "claymorehiker"
curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"
# expect: taht the record is updated in the database
curl -iv http://127.0.0.1:9099/api/v1/users -d "${MY_USER}" -X PUT -H "Accept: application/json" | tail -n 1 | jq .  && echo "http://127.0.0.1:9099/api/v1/users -d ${MY_USER}"
# expect: that the record with updated values is retireved from the database
curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"
# -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- #
# {
#   "message": "Pokus [GET /api/v1/users]: [pokus_users_dal.getUsers] callback to retrieve a user from its Id :",
#   "search": {
#     "user_id": "6203c1f76be67686cb35eb35"
#   },
#   "results": [
#     {
#       "_id": "6203c1f76be67686cb35eb35",
#       "fullname": "rihanna updated",
#       "email": "kelly@gmail.com",
#       "short_intro": "(updated) she's very brave, needs a lot of physical activity, at least 4 long walks a week.",
#       "is_female": true,
#       "birth_date": "1969-12-31T23:00:00.000Z",
#       "__v": 0
#     }
#   ]
# }
# -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- # -+-+- #




#################################################################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # --  CRUD DELETE #########################################
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
# -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- # -- #
#################################################################################

# To test deleting users :


export USER_ID="6203c1f76be67686cb35eb35"
export WRONG_USER_ID="92005b5b827d6996ec40a089"


export POKUS_QUERY_PARAMS="user_id=${USER_ID}"
# - #
# First check indeed there is no user with that id
# expect : claymorehiker
curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"

# + -> Should fail (to test the error mgmt behavior) : (for the momeent it just succeeds, but does not change anything to the database. Taht makes delete operation idempotent)
curl -X DELETE -iv "http://127.0.0.1:9099/api/v1/users?user_id=${WRONG_USER_ID}"
# + -> Should succeed :
curl -X DELETE -iv "http://127.0.0.1:9099/api/v1/users?user_id=${USER_ID}"
# expect : that there is zero result brought back from the mongo d database

export POKUS_QUERY_PARAMS="user_id=${USER_ID}"
# - #
# check indeed there is no more user with that id
# expect : no results
curl -iv "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}" -X GET -H "Accept: application/json" | tail -n 1 | jq . && echo "http://127.0.0.1:9099/api/v1/users?${POKUS_QUERY_PARAMS}"
