import React, { useEffect, useState } from "react";
import Loading from "../../img/loading2.gif";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterVideogames,
  getVideogames,
  sortVideogames,
  getDbGames,
  filterDBVideogames,
} from "../../actions";
import Card from "../Card/Card";
import "./Videogames.css";

function Home(props) {
  const [game, setGame] = useState("");
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState(true);
  const [rating, setRating] = useState(true);
  const [page, setPage] = useState(1);

  const added =
    document.getElementById("added") != null
      ? document.getElementById("added").checked
      : false;
  const existing =
    document.getElementById("existing") != null
      ? document.getElementById("existing").checked
      : false;

  useEffect(() => {
    props.getVideogames(game, filter, page);
    props.getDbGames(game, filter, page);
  }, [page]);

  console.log(props);
  function pageNumber(e) {
    e === "siguiente" ? setPage(page + 1) : setPage(page - 1);
  }

  function onFilter(val, added, existing) {
    if (existing) {
      props.getVideogames(game, val, page);
    }

    if (added) {
      props.filterDBVideogames(game, val, page);
    }

    if (!added && !existing) {
      props.getVideogames(game, val, page);
      props.filterDBVideogames(game, val, page);
    }
  }

  function onFilterHelper(e) {
    e.preventDefault();
    const val = document.querySelector(".genreFilter").value;
    onFilter(val);
  }

  // function handleCheckbox(e) {
  //   setFilter(e.target.value);
  // }

  function handleChangeFilter(event) {
    setFilter(event.target.value);
  }

  function handleChange(event) {
    setGame(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.getVideogames(game, filter, page);
    props.getDbGames(game, filter, page);
  }

  function orderByName(e) {
    e.preventDefault();
    props.sortVideogames(game, page, filter, order, rating, "name");
    setOrder(!order);
  }

  function orderByRating(e) {
    e.preventDefault();
    props.sortVideogames(game, page, filter, order, rating, "rating");
    setRating(!rating);
  }

  return (
    <div className="backg">
      <h2 className="title">Buscador de Juegos</h2>
      <div className="row containerForms">
        <form
          id="game1"
          className="form-filtrado"
          onSubmit={(e) => onFilterHelper(e)}
        >
          <input
            id="game1"
            type="text"
            value={filter}
            placeholder="Filter by genre"
            className="genreFilter"
            onChange={(e) => handleChangeFilter(e)}
          />
          <input
            type="checkbox"
            name="added"
            id="added"
            value="added"
            className="added"
          />
          <label htmlFor="added">Added</label>
          <input
            type="checkbox"
            name="existing"
            id="existing"
            value="existing"
            className="existing"
          />
          <label htmlFor="existing">Existing</label>
          <button type="submit" className="btn-filter">
            Filtrar
          </button>
        </form>
        <form
          id="game"
          className="form-buscador"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <input
              type="text"
              id="game"
              placeholder="Nombre del videojuego..."
              value={game}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className="btn" type="submit">
            {" "}
            SEARCH{" "}
          </button>
        </form>
        <div className="containerBtnOrder">
          <button className="btn btnOrder" onClick={(e) => orderByName(e)}>
            {!order ? "A-Z" : "Z-A"}
          </button>

          <button
            className="btn btnOrderRating"
            onClick={(e) => orderByRating(e)}
          >
            {!rating ? "Rating ASC" : "Rating DESC"}
          </button>
        </div>
      </div>

      <ul className="lista-games">
        {props.videogames.length < 1 && props.dbvideogames.length < 1 ? (
          <img className="loading" src={Loading} alt=""></img>
        ) : (
          //props.videogames.results &&
          props.videogames.results &&
          ((!added && !existing) || existing) &&
          // props.videogames.results.map((game) => (  ---> esto tenia antes
          props.videogames.results.map((game) => (
            <div className="cards_juegos">
              <Link to={`/videogames/${game.id}`}>
                <Card
                  key={game.id}
                  image={game.background_image}
                  name={game.name}
                  genre={game.genres.map((g) => g.name)}
                  rating={game.rating}
                />
              </Link>
            </div>
          ))
        )}
        {props.dbvideogames &&
          ((!added && !existing) || added) &&
          props.dbvideogames.map((game) => (
            <div className="cards_juegos">
              <Link to={`/dbvideogames/${game.id}`}>
                <Card
                  key={game.id}
                  name={game.name}
                  genre={game.genres.map((g) => g.name)}
                  rating={game.rating}
                />
              </Link>
            </div>
          ))}
      </ul>
      <div className="paginador">
        {page > 1 ? (
          <div className="displayPlaginador">
            <button id="anterior" onClick={() => pageNumber("anterior")}>
              Anterior
            </button>
            <p>Page: {page}</p>
            <button id="siguiente" onClick={() => pageNumber("siguiente")}>
              Siguiente
            </button>
          </div>
        ) : (
          <div className="displayPaginador">
            <p>Page: {page}</p>
            <button id="siguiente" onClick={() => pageNumber("siguiente")}>
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videogames: state.videogames,
    dbvideogames: state.dbvideogames,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getVideogames: (game, genre, page) =>
      dispatch(getVideogames(game, genre, page)),
    getDbGames: (game, genre, page) => dispatch(getDbGames(game, genre, page)),
    filterVideogames: (game, val, page) =>
      dispatch(filterVideogames(game, val, page)),
    filterDBVideogames: (game, val, page) =>
      dispatch(filterDBVideogames(game, val, page)),
    sortVideogames: (game, page, genre, order, rating, key) =>
      dispatch(sortVideogames(game, page, genre, order, rating, key)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
