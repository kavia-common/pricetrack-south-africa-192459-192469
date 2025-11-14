#!/bin/bash
cd /home/kavia/workspace/code-generation/pricetrack-south-africa-192459-192469/web_mobile_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

