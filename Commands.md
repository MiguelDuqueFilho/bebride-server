# bebride-server

<!-- Comando em sequencia usados na criação do Projeto

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

error sequelize
{
"name": "SequelizeDatabaseError",
"parent": {
"code": "ER_NO_DEFAULT_FOR_FIELD",
"errno": 1364,
"sqlState": "HY000",
"sqlMessage": "Field 'password_hash' doesn't have a default value",
"sql": "INSERT INTO `users` (`id`,`user_name`,`user_email`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?,?);",
"parameters": [
"Caio Duque",
"caio.duque@globo.com",
"2020-01-17 00:00:07",
"2020-01-17 00:00:07"
]
},
"original": {
"code": "ER_NO_DEFAULT_FOR_FIELD",
"errno": 1364,
"sqlState": "HY000",
"sqlMessage": "Field 'password_hash' doesn't have a default value",
"sql": "INSERT INTO `users` (`id`,`user_name`,`user_email`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?,?);",
"parameters": [
"Caio Duque",
"caio.duque@globo.com",
"2020-01-17 00:00:07",
"2020-01-17 00:00:07"
]
},
"sql": "INSERT INTO `users` (`id`,`user_name`,`user_email`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?,?);",
"parameters": [
"Caio Duque",
"caio.duque@globo.com",
"2020-01-17 00:00:07",
"2020-01-17 00:00:07"
]
}

---

{
"name": "SequelizeUniqueConstraintError",
"errors": [
{
"message": "User_email must be unique",
"type": "unique violation",
"path": "User_email",
"value": "caio.duque@globo.com",
"origin": "DB",
"instance": {
"id": null,
"userName": "Caio Duque",
"userEmail": "caio.duque@globo.com",
"passwordHash": "123456",
"updatedAt": "2020-01-17T00:11:11.147Z",
"createdAt": "2020-01-17T00:11:11.147Z"
},
"validatorKey": "not_unique",
"validatorName": null,
"validatorArgs": []
}
],
"fields": {
"User_email": "caio.duque@globo.com"
},
"parent": {
"code": "ER_DUP_ENTRY",
"errno": 1062,
"sqlState": "23000",
"sqlMessage": "Duplicate entry 'caio.duque@globo.com' for key 'User_email'",
"sql": "INSERT INTO `users` (`id`,`user_name`,`user_email`,`password_hash`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?,?,?);",
"parameters": [
"Caio Duque",
"caio.duque@globo.com",
"123456",
"2020-01-17 00:11:11",
"2020-01-17 00:11:11"
]
},
"original": {
"code": "ER_DUP_ENTRY",
"errno": 1062,
"sqlState": "23000",
"sqlMessage": "Duplicate entry 'caio.duque@globo.com' for key 'User_email'",
"sql": "INSERT INTO `users` (`id`,`user_name`,`user_email`,`password_hash`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?,?,?);",
"parameters": [
"Caio Duque",
"caio.duque@globo.com",
"123456",
"2020-01-17 00:11:11",
"2020-01-17 00:11:11"
]
},
"sql": "INSERT INTO `users` (`id`,`user_name`,`user_email`,`password_hash`,`created_at`,`updated_at`) VALUES (DEFAULT,?,?,?,?,?);"
}

---

{
"name": "SequelizeConnectionError",
"parent": {
"code": "ER_BAD_DB_ERROR",
"errno": 1049,
"sqlState": "42000",
"sqlMessage": "Unknown database 'db_bebride_adminx'"
},
"original": {
"code": "ER_BAD_DB_ERROR",
"errno": 1049,
"sqlState": "42000",
"sqlMessage": "Unknown database 'db_bebride_adminx'"
}
}

var messages = {
"information": {
"mes_0": "this link will open in a new browser window",
"mes_1": "This link will open in a new browser window",
"mes_2": "Rollover image from left to right to rotate",
"mes_3": "Loading tweets...",
"mes_4": "Latest Tweets",
"mes_5": "Click to view photo {val}",
"mes_6": "Click to view 360",
"mes_7": "Click to view video",
"mes_8": "Click to view photo",
"mes_9": "out of stock",
"mes_10": "low stock",
"mes_11": "click on a size below",
"mes_12": "Sorry, this item is out of stock.",
"mes_13": "Select Size: ",
"mes_14": "Please wait",
"mes_15": "Continue shopping",
"mes_16": "{val} item(s) added to bag",
"mes_17": "Size {val}",
"mes_18": "{val} item(s) in your bag Subtotal: {currency}{val}",
"mes_19": "s",
"mes_20": "item",
"mes_21": "You need to select a size before you can add this item to your bag."
},
"product_or_bundle": {
"mes_0": "Rollover image to zoom.",
"mes_1": "View large image",
"mes_2": "Photo {val} of prod name",
"mes_3": "Scroll up",
"mes_4": "Scroll down",
"mes_5": "View details of {val}",
"mes_6": "Remove this item",
"mes_7": "Remove",
"mes_8": "Scroll left",
"mes_9": "Scroll right",
"mes_10": "Check Availability In Store:",
"mes_11": "Outfit added to bag",
"mes_12": "Click to view full details of this item"
},
"error": {
"mes_0": "Sorry, an error occurred when trying to add your item. Please try again.",
"mes_1": "Sorry, an error occurred when trying to add your items. Please try again.",

                        {

}

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
} -->
