class EventsController {
  get(req, res) {
    return res
      .status(200)
      .send([{ nome: "Test", description: "Teste Description" }]);
  }
}

module.exports = new EventsController();
