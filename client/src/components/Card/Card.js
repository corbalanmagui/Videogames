import React from "react";
import { connect } from "react-redux";
import "./Card.css";

function Card({ name, image, genre, rating }) {
  return (
    <div className="card">
      <div className="card-header">
        <div id="gameCard" className="row">
          <h3>{name}</h3>
          <p className="genre">Genre: {" " + genre}</p>
          <p className="rating">Rating: {" " + rating}</p>
          <img className="img" src={image} alt="" width="100" height="90"></img>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videogames: state.videogames,
  };
}

export default connect(mapStateToProps)(Card);
