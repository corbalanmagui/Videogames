import fetch from "node-fetch";

export function getVideogames(nombre, genero, page) {
  let game = nombre;
  if (!nombre) {
    game = "";
  }
  const url = `http://localhost:3001/videogames?search=${game}&page=${page}`;
  return function (dispatch) {
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        //let results = json.results;
        //console.log(json);
        if (genero !== "") {
          let array = [];
          json.results.forEach((game) => {
            const generos = game.genres.filter((g) => g.name === genero);
            if (generos.length > 0) {
              array.push(game);
            }
          });
          //json.results = array;
          //console.log(json.results);
          json.results = array;
        }
        const a = 15 * (page - 1);
        const b = 15 * page;
        const filtrado = {};
        filtrado.results = json.results.slice(a, b);
        return dispatch({
          type: "GET_VIDEOGAMES",
          payload: filtrado,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function sortVideogames(nombre, page, genero, order, rating, key) {
  let game = nombre;
  if (!nombre) {
    game = "";
  }
  const url = `http://localhost:3001/videogames?search=${game}&page=${page}`;
  return function (dispatch) {
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        console.log(json);
        if (genero !== "") {
          let array = [];
          json.results.forEach((game) => {
            const generos = game.genres.filter((g) => g.name === genero);
            if (generos.length > 0) {
              array.push(game);
            }
          });

          json.results = array;
        }

        if (key === "name") {
          console.log("entro al name");
          switch (order) {
            case true:
              json.results.sort((a, b) =>
                a.name < b.name ? 1 : b.name < a.name ? -1 : 0
              );
              break;
            case false:
              json.results.sort((a, b) =>
                a.name > b.name ? 1 : b.name > a.name ? -1 : 0
              );
              break;
            default:
              break;
          }
        }

        if (key === "rating") {
          console.log("entro al rating");
          switch (rating) {
            case true:
              json.results.sort((a, b) =>
                a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
              );
              break;
            case false:
              json.results.sort((a, b) =>
                a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0
              );
              break;
            default:
              break;
          }
        }

        const a = 15 * (page - 1);
        const b = 15 * page;
        const filtrado = {};
        filtrado.results = json.results.slice(a, b);
        dispatch({
          type: "GET_VIDEOGAMES",
          payload: filtrado,
        });
      });
  };
}

export function filterVideogames(nombre, genero, page) {
  //--> ESTA YA NO SIRVE
  let game = nombre;
  if (!nombre) {
    game = "";
  }
  const url = `http://localhost:3001/videogames?search=${game}&page=${page}`;
  return function (dispatch) {
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (genero !== "") {
          let array = [];
          json.results.forEach((game) => {
            const generos = game.genres.filter((g) => g.name === genero);
            if (generos.length > 0) {
              array.push(game);
            }
          });
          json.results = array;
        }
        dispatch({
          type: "GET_VIDEOGAMES",
          payload: json,
        });
      });
  };
}

export function filterDBVideogames(nombre, genero, page) {
  let game = nombre;
  if (!nombre) {
    game = "";
  }
  const url = `http://localhost:3001/games`;
  return function (dispatch) {
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        let array = json;
        let filtered = false;
        if (nombre !== "") {
          array = json.filter((g) => g.name.includes(nombre));
          filtered = true;
        }

        if (genero !== "") {
          array.forEach((game) => {
            const generos = game.genres.filter((g) => g.name === genero);
            if (generos.length === 0) {
              array.pop(game);
            }
          });
          filtered = true;
        }

        if (filtered) {
          json = array;
        }
        dispatch({
          type: "GET_DBGAMES",
          payload: json,
        });
      });
  };
}

export function getVideogameInfo(id) {
  return async function (dispatch) {
    return await fetch("http://localhost:3001/videogames/" + id)
      .then((r) => r.json())
      .then((json) => {
        dispatch({
          type: "GET_VIDEOGAME_INFO",
          payload: json,
        });
      });
  };
}

export function getDBVideogameInfo(id) {
  return async function (dispatch) {
    return await fetch("http://localhost:3001/dbvideogames/" + id)
      .then((r) => r.json())
      .then((json) => {
        dispatch({
          type: "GET_VIDEOGAME_INFO",
          payload: json,
        });
      });
  };
}

export function getGenres() {
  return async function (dispatch) {
    return await fetch("http://localhost:3001/genres")
      .then((r) => r.json())
      .then((json) => {
        dispatch({
          type: "GET_GENRES",
          payload: json,
        });
      });
  };
}

export function getDbGames(nombre, genero, page) {
  return async function (dispatch) {
    return await fetch("http://localhost:3001/games")
      .then((r) => r.json())
      .then((json) => {
        let array = json;
        let filtered = false;
        if (nombre !== "") {
          array = json.filter((g) => g.name.includes(nombre));
          filtered = true;
        }

        if (genero !== "") {
          array.forEach((game) => {
            const generos = game.genres.filter((g) => g.name === genero);
            if (generos.length === 0) {
              array.pop(game);
            }
          });
          filtered = true;
        }

        if (filtered) {
          json = array;
        }

        dispatch({
          type: "GET_DBGAMES",
          payload: json,
        });
      });
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    return await fetch("http://localhost:3001/platforms")
      .then((r) => r.json())
      .then((json) => {
        dispatch({
          type: "GET_PLATFORMS",
          payload: json,
        });
      });
  };
}
