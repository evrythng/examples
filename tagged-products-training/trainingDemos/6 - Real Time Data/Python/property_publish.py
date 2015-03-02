#!/usr/bin/python


import sys
try:
    import paho.mqtt.publish as publish
except ImportError:
    # This part is only required to run the example from within the examples
    # directory when the module itself is not installed.
    #
    # If you have the module installed, just use "import paho.mqtt.publish"
    import os
    import inspect
    cmd_subfolder = os.path.realpath(os.path.abspath(os.path.join(os.path.split(inspect.getfile( inspect.currentframe() ))[0],"../src")))
    if cmd_subfolder not in sys.path:
        sys.path.insert(0, cmd_subfolder)
    import paho.mqtt.publish as publish


payload = '[{"value": "1"}]'
thngid = 'UVQRAhSs8epa2htestpa5e2q'
# use user key
api_key = 'OiybOvA3Nq56L9nmaCHRbcxSRA8kqKzzEw7A20RB0aoUNMZcPBdrh15BUP2H9o65qCxS9j4ExAilY4xm'
property_name = 'numberofoutlets'
evt_host = 'pubsub.evrythng.com'


topic = 'thngs/' + thngid + '/properties/' + property_name + '?access_token=' + api_key

publish.single(topic, payload, hostname=evt_host)

