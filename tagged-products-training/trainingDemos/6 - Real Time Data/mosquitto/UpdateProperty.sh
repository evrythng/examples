#!/bin/sh
echo Update Property to 3
mosquitto_pub -h pubsub.evrythng.com -t thngs/UVQRAhSs8epa2htestpa5e2q/properties/numberofoutlets?access_token=OiybOvA3Nq56L9nmaCHRbcxSRA8kqKzzEw7A20RB0aoUNMZcPBdrh15BUP2H9o65qCxS9j4ExAilY4xm -m '[{"value": 3}]'
