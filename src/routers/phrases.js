const phrasesService = require (__dirname+"/../services/phrases.js");

module.exports = (server, phrasesRef) => {
  server.get("/phrases/:id", phrasesService.getById(phrasesRef));
  server.get("/phrases", phrasesService.get(phrasesRef));
  server.post("/phrases", phrasesService.insert(phrasesRef));
  server.put("/phrases/:id", phrasesService.update(phrasesRef));
  server.del("/phrases/:id", phrasesService.remove(phrasesRef));
  return server;
}
