#!/bin/bash

cd "$(dirname "$0")"

cd ..
{ # try

    docker run --network="host"  -p 3000:3000 awaken-client 

} || { 
    ./cmd/build.sh && docker run --network="host"  -p 3000:3000 awaken-client 
}