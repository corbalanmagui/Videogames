const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  //Las siguientes instrucciones son para que el id comience desde el ultimo id
  //que existe en la api de videogames, en este caso seria a partir del 560743
  /*
   1) CREATE SEQUENCE videogames_sequence OWNED BY videogames.id
   2) SELECT setval('videogames_sequence', 560742) FROM videogames;
   3) ALTER TABLE videogames ALTER COLUMN id SET DEFAULT nextval('videogames_sequence');
  */
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      release: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.STRING,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  sequelize.define(
    "genres",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
