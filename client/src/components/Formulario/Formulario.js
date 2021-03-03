import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getGenres, getPlatforms } from "../../actions";
import "./Formulario.css";

function Formulario(props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    release: "",
    rating: 0,
    platform: "",
    genres: [],
  });
  const [checkPlatforms, setcheckPlatforms] = useState([]);
  const [checkGenres, setcheckGenres] = useState([]);

  useEffect(() => {
    props.getGenres();
    props.getPlatforms();
  }, []);

  //Este es el post para crear el videojuego
  function handleSubmit(e) {
    e.preventDefault();
    form.platform = checkPlatforms.map((g) => " " + g).toString();
    form.genres = checkGenres;
    fetch("http://localhost:3001/videogame", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
    alert("Juego guardado!");
  }

  function handleChange(e) {
    //actualiza los states
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handlePlatform(e) {
    e.target.checked
      ? setcheckPlatforms([...checkPlatforms, e.target.value])
      : setcheckPlatforms(checkPlatforms.filter((c) => c !== e.target.value));
  }

  function handleGenre(e) {
    e.target.checked
      ? setcheckGenres([...checkGenres, e.target.value])
      : setcheckGenres(checkGenres.filter((c) => c !== e.target.value));
  }

  return (
    <div className="bgr">
      <h2 className="titulo-form"> Create a new Videogame </h2>
      <div className="formulario-tot">
        <form onSubmit={(e) => handleSubmit(e)}>
          <section className="nombre">
            <label htmlFor="name"> Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </section>

          <section className="descripcion">
            <label htmlFor="description"> Description: </label>
            <br />
            <textarea
              id="description"
              name="description"
              rows="6"
              cols="40"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </section>

          <section className="lanzamiento">
            <label htmlFor="release"> Release: </label>
            <input
              type="text"
              id="release"
              name="release"
              onChange={(e) => handleChange(e)}
            />
          </section>

          <section className="ratingf">
            <label htmlFor="rating"> Rating: </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="5"
              step="0.01"
              onChange={(e) => handleChange(e)}
            />
          </section>

          <section className="generos">
            <span> Select the genre/s </span>

            <div className="containerGeneros">
              {props.generos.map((gen) => (
                <div>
                  <label htmlFor={gen.id}>{gen.name}</label>
                  <input
                    type="checkbox"
                    name="generos"
                    id={gen.id}
                    value={gen.id}
                    key={gen.id}
                    onChange={(e) => handleGenre(e)}
                  ></input>
                </div>
              ))}
            </div>
          </section>

          <section className="plataformas">
            <span> Select the platform/s </span>
            <br />
            <div className="containerPlataformas">
              {props.plataformas.results &&
                props.plataformas.results.map((plat) => (
                  <div>
                    <label htmlFor={plat.id}>{plat.name}</label>
                    <input
                      type="checkbox"
                      name="plataformas"
                      id={plat.id}
                      value={plat.name}
                      key={plat.id}
                      onChange={(e) => handlePlatform(e)}
                    ></input>
                  </div>
                ))}
            </div>
          </section>
          <button type="submit">Guardar</button>
          <button type="reset">Resetear</button>
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    generos: state.genres,
    plataformas: state.platforms,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGenres: () => dispatch(getGenres()),
    getPlatforms: () => dispatch(getPlatforms()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
