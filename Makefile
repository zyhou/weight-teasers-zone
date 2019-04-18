
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

drop-db:
	sudo -u postgres dropdb $(PGDATABASE)

populate-db:
	yarn workspace @weight-teasers-zone/api populate-db
