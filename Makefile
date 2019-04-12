
-include .env

install:
	yarn

start-web:
	yarn workspace @weight-teasers-zone/web start

start-api:
	yarn workspace @weight-teasers-zone/api start

create-db:
	sudo -u postgres createdb $(PGDATABASE)

init-db:
	psql $(PGDATABASE) < packages/api/db/init.sql
