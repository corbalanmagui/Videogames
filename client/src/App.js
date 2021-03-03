import React from "react";

import "./App.css";
import Inicio from "./components/Inicio/Inicio";
import NavBar from "./components/NavBar/NavBar";
import Videogames from "./components/Videogames/Videogames";
import InfoGame from "./components/InfoGame/InfoGame";
import Formulario from "./components/Formulario/Formulario";
import { Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Route exact path="/" component={Inicio} />
      <Route exact path="/videogames" component={Videogames} />
      <Route path="/videogames/:id" component={InfoGame} />
      <Route path="/dbvideogames/:id" component={InfoGame} />
      <Route exact path="/addVideogame" component={Formulario} />
    </React.Fragment>
  );
}

export default App;
