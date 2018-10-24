#!/bin/bash

psql -c "DROP DATABASE IF EXISTS db_chat_app;"
psql -c "DROP USER IF EXISTS superkraken;" 
psql -c "CREATE DATABASE db_chat_app;"
psql -c "CREATE USER superkraken WITH ENCRYPTED PASSWORD 'superkraken';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE db_chat_app TO superkraken;"
