# bebride-server

Comando em sequencia usados na criação do Projeto

yarn init
question name (BeBride-Server):
question version (1.0.0):
question description: Serviço da parte Administrativa da BeBride
question entry point (index.js): server.js
question repository url:
question author: Miguel Duque Filho
question license (MIT):

git init
git add \*
git remote add origin https://github.com/MiguelDuqueFilho/bebride-server.git
git commit -m "first commit"
git push -u origin master

comandos knex:
yarn knex init
Commands:
init [options] Create a fresh knexfile.
migrate:make [options] <name> Create a named migration file.
migrate:latest [options] Run all migrations that have not yet been run.
migrate:up [<name>] Run the next or the specified migration that has not yet been run.
migrate:rollback [options] Rollback the last batch of migrations performed.
migrate:down [<name>] Undo the last or the specified migration that was already run.
migrate:currentVersion View the current version for the migration.
migrate:list|migrate:status List all migrations files with status.
seed:make [options] <name> Create a named seed file.
seed:run [options] Run seed files.
Created ./knexfile.js

yarn knex migrate:make create_table_users

yarn knex migrate:latest
