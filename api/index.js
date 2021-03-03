//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require("dotenv").config();
const server = require("./src/app.js");
const { conn, Genres } = require("./src/db.js");
const fetch = require("node-fetch");
const { API_KEY } = process.env;

// Syncing all the models at once.
// force: false --> no se borra la db cada vez que actualizo mi app

// Guardo los genres de la api en mi db.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console

    fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then((r) => r.json())
      .then((data) => {
        for (let i = 0; i < data.results.length; i++) {
          Genres.create({ name: data.results[i].name, id: data.results[i].id });
        }
      });
  });
});
