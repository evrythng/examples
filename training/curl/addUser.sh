#!/bin/sh
curl -X POST -H "Content-Type: application/json" -H "Authorization: lAwoL9SRTFx6SJFsR6qvpqj0G8MeSL2k6m4Lq2npugZLKV07aMf0mr5V9x4kVYnuNUCIgGcLvrUMCzuU" -H "Cache-Control: no-cache" -H "Postman-Token: 7ea1e868-0ab6-c9c3-8adf-afc0fe78e478" -d '{
  "email": "cokeuser@mcc.com",
  "firstName": "Coke",
  "lastName": "User",
  "password": "admin123"
}' https://api.evrythng.com/auth/evrythng/users