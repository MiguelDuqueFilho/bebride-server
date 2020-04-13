const path = require("path");

class siteController {
  getBanner(req, res) {
    const i = Math.floor(Math.random() * 3) + 1;
    res.sendFile(
      path.resolve(__dirname, `../../assets/img/banners/banner_${i}.png`)
    );
  }

  getBannerPlan(req, res) {
    const { type } = req.params;
    res.sendFile(
      path.resolve(__dirname, `../../assets/img/banners/${type}_banner.png`)
    );
  }

  getDeposition(req, res) {
    const { id } = req.params;
    res.sendFile(
      path.resolve(
        __dirname,
        `../../assets/img/depositions/deposition_${id}.jpg`
      )
    );
  }
  getTeam(req, res) {
    const { team } = req.params;
    res.sendFile(
      path.resolve(__dirname, `../../assets/img/teams/avatar_${team}.png`)
    );
  }
}
module.exports = new siteController();
