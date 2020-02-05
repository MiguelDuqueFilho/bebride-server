class DashboardController {
  get(req, res) {
    throw new Error("mensagem de erro!!!");
    res.send("Hello Word");
    // return res.status(200).send({ credit: 18400, debt: 1619.12 });
  }
}

module.exports = new DashboardController();
