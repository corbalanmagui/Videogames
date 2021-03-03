/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  description: "Mario rescata a la princesa",
  id: "newgame1",
  platform: "PC",
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );
  describe("GET /videogames", () => {
    it("should get 200", () => {
      return agent.get("/videogames").expect(200);
    });
  });
  describe("GET /videogames/:idVideogame", () => {
    it("responde con 404 cuando la página no existe", () => {
      return agent
        .get("/videogames/noexiste")
        .expect({ Error: "No hay juego que coincida con ese id." });
    });
    it("responde con 200 cuando la página existe", () => {
      return Videogame.create({
        name: "hola",
        description: "holaas",
        id: 3498,
        platform: "PC",
      }).then(() => {
        return agent.get("/videogames/3498").expect(200);
      });
    });
  });
});
