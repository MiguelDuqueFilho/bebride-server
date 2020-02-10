# bebride-server

Comando em sequencia usados na criação do Projeto

commands yarn:
yarn init
question name (BeBride-Server):
question version (1.0.0):
question description: Serviço da parte Administrativa da BeBride
question entry point (index.js): server.js
question repository url:
question author: Miguel Duque Filho
question license (MIT):

commands git:
git init
git add .
git remote add origin https://github.com/MiguelDuqueFilho/bebride-server.git
git commit -m "first commit"
git push -u origin master

commands sequelize:
yarn sequelize init
yarn sequelize migrate:create --name=create-users
yarn sequelize db:migrate
yarn sequelize db:migrate:undo
yarn sequelize seed:generate --name carga-inicial-users
yarn sequelize db:seed:all
yarn sequelize db:seed:undo:all


RFC 7807 generalized error-handling schema.

This schema is composed of five parts:

type — A URI identifier that categorizes the error
title — A brief, human-readable message about the error
status — The HTTP response code (optional)
detail — A human-readable explanation of the error
instance — A URI that identifies the specific occurrence of the error

Instead of using our custom error response body, we can convert our body to:

{
"type": "/errors/incorrect-user-pass",
"title": "Incorrect username or password.",
"status": 403,
"detail": "Authentication failed due to incorrect username or password.",
"instance": "/login/log/abc123"
}
