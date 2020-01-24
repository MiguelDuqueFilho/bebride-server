class DashboardController {
  get(req, res) {
    return res.status(200).json({ message: "dashboard" });
  }
}

module.exports = new DashboardController();
