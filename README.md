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

comandos sequelize:
yarn sequelize init
yarn sequelize db:migration:create --name=create-users
yarn sequelize db:migrate
yarn sequelize db:migrate:undo
yarn sequelize seed:generate --name carga-inicial-users
yarn sequelize db:seed:all 
yarn sequelize db:seed:undo:all 