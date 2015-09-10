#!/usr/bin/env bash

SERVER="https://api.evrythng.com"

ACTION_TYPE="_setLedStatus"

[ -z "$EVRYTHNG_API_KEY" ] && EVRYTHNG_API_KEY=$1

# Ultra basic script to extract json content
function parse_json()
{
    echo $1 | \
    sed -e 's/[{}]/''/g' | \
    sed -e 's/", "/'\",\"'/g' | \
    sed -e 's/" ,"/'\",\"'/g' | \
    sed -e 's/" , "/'\",\"'/g' | \
    sed -e 's/","/'\"---SEPERATOR---\"'/g' | \
    awk -F=':' -v RS='---SEPERATOR---' "\$1~/\"$2\"/ {print}" | \
    sed -e "s/\"$2\"://" | \
    tr -d "\n\t" | \
    sed -e 's/\\"/"/g' | \
    sed -e 's/\\\\/\\/g' | \
    sed -e 's/^[ \t]*//g' | \
    sed -e 's/^"//'  -e 's/"$//'
}

# Create a config.json file
cat << EOL > config.json
{"operatorApiKey":"$EVRYTHNG_API_KEY",
EOL

# Create a Project
PROJECT="""$(curl -s -X POST "$SERVER/projects" \
     -H "Authorization: $EVRYTHNG_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{ "name": "Embedded Devices", "description": "Project for the EVT embedded devices quickstart" }')"""

PROJECT_ID=`parse_json "$PROJECT" id`

echo "Created Project ID: $PROJECT_ID"

echo """

$PROJECT

"""

cat << EOL >> config.json
"projectId":"$PROJECT_ID",
EOL

# Create a Custom Action in this project
ACTION_RECORD="""$(curl -s -X POST "$SERVER/actions?project=$PROJECT_ID" \
     -H "Authorization: $EVRYTHNG_API_KEY" \
     -H "Content-Type: application/json" \
     -d "{ \"name\": \"$ACTION_TYPE\", \"description\": \"Turns the LED on or off\",\"tags\":[\"WoT\",\"device\"] }")"""

echo """

$ACTION_RECORD

"""

# Create a Product
PRODUCT="""$(curl -s -X POST "$SERVER/products?project=$PROJECT_ID" \
     -H "Authorization: $EVRYTHNG_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{ "fn": "Intel Edison board", "description": "A Web-connected smart washing machine","tags":["WoT","device","energy"],"photos":["https://software.intel.com/sites/default/files/managed/cd/8e/IoT_getstarted_edisonboard.png"] }')"""

PRODUCT_ID=`parse_json "$PRODUCT" id`



echo "Created Product ID: $PRODUCT_ID"

echo """

$PRODUCT

"""

cat << EOL >> config.json
"productId":"$PRODUCT_ID",
EOL

# Create a Thng
THNG="""$(curl -s -X POST "$SERVER/thngs?project=$PROJECT_ID" \
     -H "Authorization: $EVRYTHNG_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{ "name": "Washing machine control unit", "product":"'$PRODUCT_ID'", "description": "Intel Edison conroller","tags":["WoT","device","energy"] }')"""

THNG_ID=`parse_json "$THNG" id`




echo "Created Thng ID: $THNG_ID"

echo """

$THNG

"""

cat << EOL >> config.json
"thngId":"$THNG_ID",
EOL

# Now we create an application within this project
APP="""$(curl -s -X POST "$SERVER/projects/$PROJECT_ID/applications" \
     -H "Authorization: $EVRYTHNG_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{ "name": "Smart washing machine", "description": "A led-blinking smart washing machine","tags":["WoT","device","energy"], "socialNetworks": {} }')"""



APP_ID=`parse_json "$APP" id`
APP_API_KEY=`parse_json "$APP" appApiKey`

echo "Created App ID: $APP_ID"

echo """

$APP

"""

cat << EOL >> config.json
"appId":"$APP_ID",
"appApiKey":"$APP_API_KEY",
EOL

# Let's now create a device API Key
THNG_API="""$(curl -s -X POST "$SERVER/auth/evrythng/thngs" \
     -H "Authorization: $EVRYTHNG_API_KEY" \
     -H "Content-Type: application/json" \
     -d "{ \"thngId\": \"$THNG_ID\" }")"""



THNG_API_KEY=`parse_json "$THNG_API" thngApiKey`

echo """

$THNG_API

"""

cat << EOF >> config.json
"thngApiKey":"$THNG_API_KEY"}
EOF