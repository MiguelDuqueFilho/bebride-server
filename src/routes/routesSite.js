const routes = require("express").Router();

const siteController = require("../api/site/site");
const { deposition } = require("../api/admin/Depositions");

routes.get("/banner/img", siteController.getBanner);
routes.get("/bannerplan/:type/img", siteController.getBannerPlan);
routes.get("/teams/:team/img", siteController.getTeam);
routes.get("/deposition/:id/img", siteController.getDeposition);
routes.get("/depositions", deposition.get);
module.exports = routes;
