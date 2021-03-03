require("dotenv").config();
const { Router } = require("express");
const fetch = require("node-fetch");
const { API_KEY } = process.env;
const { Genres, Videogame, conn } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res) => {
  let results = [];
  await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40&search=${req.query.search}`
  )
    .then((r) => r.json())
    .then((data) => {
      data.results.map((o) => results.push(o));
    });
  await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40&search=${req.query.search}`
  )
    .then((r) => r.json())
    .then((data) => {
      data.results.map((o) => results.push(o));
      data.results = results;
      res.send(data);
    })
    .catch((e) => {
      console.error(e);
    });
});

router.get("/videogames/:idVideogame", (req, res) => {
  fetch(
    `https://api.rawg.io/api/games/${req.params.idVideogame}?key=${API_KEY}`
  )
    .then((r) => r.json())
    .then((data) => {
      if (data.detail === "Not found.") {
        return res
          .status(404)
          .json({ Error: "No hay juego que coincida con ese id." });
      } else {
        const videogame = {
          image: data.background_image,
          name: data.name,
          genre: data.genres.map((g) => " - " + g.name),
          description: data.description,
          release: data.released,
          rating: data.rating,
          platforms: data.platforms.map((p) => " - " + p.platform.name),
        };
        res.json(videogame);
      }
    });
});

router.get("/dbvideogames/:idVideogame", async (req, res) => {
  await Videogame.findOrCreate({
    where: {
      id: req.params.idVideogame,
    },
    include: [
      {
        model: Genres,
      },
    ],
  }).then((g) => {
    console.log(g);
    console.log("Me traje el game");
    if (g == null || g == undefined) {
      return res
        .status(404)
        .json({ Error: "No hay juego que coincida con ese id." });
    } else {
      const videogame = {
        image: "",
        name: g[0].dataValues.name,
        genre: g[0].dataValues.genres.map((g) => " - " + g.name),
        description: g[0].dataValues.description,
        release: g[0].dataValues.release,
        rating: g[0].dataValues.rating,
        platforms: g[0].dataValues.platform,
      };
      res.json(videogame);
    }
  });
});

router.get("/genres", async (req, res) => {
  //console.log(genresFromDb);
  try {
    const generos = await Genres.findAll();
    res.json(generos);
  } catch (error) {
    console.error("Error");
  }
});

router.get("/games", async (req, res) => {
  try {
    const Juegos = await Videogame.findAll({
      include: [
        {
          model: Genres,
        },
      ],
    });
    res.json(Juegos);
  } catch (error) {
    console.error("Error");
  }
});

router.get("/platforms", async (req, res) => {
  await fetch(`https://api.rawg.io/api/platforms`)
    .then((r) => r.json())
    .then((data) => {
      res.json(data);
    });
});

router.post("/videogame", (req, res) => {
  const body = req.body;
  const genres = req.body.genres;
  Videogame.findOrCreate({
    where: {
      name: body.name,
      description: body.description,
      release: body.release,
      rating: body.rating,
      platform: body.platform,
    },
  }).then((juegoCreado) => {
    console.log(juegoCreado);
    genres.map((g) => {
      // Como videogames no define la tabla intermedia, ejecuto una query a mano
      // para actualizar la tabla intermedia con los genres seleccionados. Sequelize ejecuta esta query a la db.
      conn.query(
        `INSERT INTO videogames_genres VALUES (NOW(), NOW(), ${juegoCreado[0].dataValues.id}, ${g})`
      );
    });
  });
});

module.exports = router;
