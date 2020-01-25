class DashboardController {
  get(req, res) {
    console.log(req.decode);

    return res.status(200).json({ message: "dashboard" });
  }
}

module.exports = new DashboardController();
