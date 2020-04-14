const routes = require("express").Router();

const siteController = require("../api/site/site");

routes.get("/banner/img", siteController.getBanner);
routes.get("/bannerplan/:type/img", siteController.getBannerPlan);
routes.get("/teams/:team/img", siteController.getTeam);
routes.get("/deposition/:id/img", siteController.getDeposition);

module.exports = routes;
