#!/bin/sh
curl -X POST -H "Content-Type: application/json" -H "Authorization: EVRYTHNGKEY" -H "Cache-Control: no-cache" -H "Postman-Token: 7ea1e868-0ab6-c9c3-8adf-afc0fe78e478" -d '{
  "email": "cokeuser@mcc.com",
  "firstName": "Coke",
  "lastName": "User",
  "password": "PASSWORD"
}' https://api.evrythng.com/auth/evrythng/users