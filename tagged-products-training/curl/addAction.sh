#!/bin/sh
curl -X POST -H "Content-Type: application/json" -H "Authorization: EVRYTHNGOPERATORKEY" -H "Cache-Control: no-cache" -H "Postman-Token: a8b24fa2-496b-94bf-69d7-e4f06c72f507" -d '{
  "name": "_HappyMeShare"
}' https://api.evrythng.com/actions?app=all
