#!/bin/bash

if [[ $1 = 'build' ]]; then
    echo "build"
    cd client
    grunt jenkins-build
  else 
    echo "no command"
  fi 