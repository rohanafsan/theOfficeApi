#!/bin/bash

dropdb -U postgres officedb
createdb -U manager_user officedb


psql -U manager_user officedb < ./bin/sql/dundermifflin.sql

echo "officedb configured"