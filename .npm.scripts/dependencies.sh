#!/bin/bash

npm uninstall -s newman
npm uninstall -g newman
npm uninstall -s newman-reporter-html
npm uninstall -g newman-reporter-html


npm install --save-dev newman
npm install --save-dev newman-reporter-htmlextra
npm install --save-dev newman-reporter-htmlextra-and-perf
npm install --save-dev @decathlon/newman-reporter-pullrequest-decorator

npm install --save-dev newman-reporter-json


# https://www.npmjs.com/package/newman-reporter-htmlextra-and-perf
# https://www.npmjs.com/package/@decathlon/newman-reporter-pullrequest-decorator

# npm install -g newman-reporter-html
# npm uninstall -g newman-reporter-html
