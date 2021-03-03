import React, { useEffect } from "react";
import { getVideogameInfo, getDBVideogameInfo } from "../../actions";
import { connect } from "react-redux";
import "./InfoGame.css";

function Info(props) {
  console.log(props);

  useEffect(() => {
    if (props.match.path.includes("dbvideogames")) {
      props.getDBVideogameInfo(props.match.params.id);
    } else {
      props.getVideogameInfo(props.match.params.id);
    }
  }, [props]);

  let categorias = props.infogame.genre;

  return (
    <div>
      <div>
        <h1 className="titulo"> {props.infogame.name} </h1>
        <h3 className="genero"> Genre/s: {categorias} </h3>
        <h4 className="desc"> Description: </h4>
        <div className="description">
          <p
            dangerouslySetInnerHTML={{ __html: props.infogame.description }}
          ></p>
        </div>
        <h4 className="desc"> Release: {props.infogame.release} </h4>
        <h4 className="desc"> Rating: {props.infogame.rating}</h4>
        <h4 className="desc"> Platforms: {props.infogame.platforms}</h4>
      </div>
      <div id="imagen-videojuego">
        <img src={props.infogame.image} alt=""></img>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    infogame: state.infogame,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getVideogameInfo: (id) => dispatch(getVideogameInfo(id)),
    getDBVideogameInfo: (id) => dispatch(getDBVideogameInfo(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);
