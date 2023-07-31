require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
    // direct: {
    //   freezeTableName: true
    // }
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Role, Sale, Provider, Category, Product, Favorite, Review} =
  sequelize.models;

Role.hasMany(User);
User.belongsTo(Role);

User.hasMany(Sale);
Sale.belongsTo(User);



Sale.belongsToMany(Product, { through: "DetailSale" });
Product.belongsToMany(Sale, { through: "DetailSale" });

Provider.belongsToMany(Product, { through: "ProvProd" });
Product.belongsToMany(Provider, { through: "ProvProd" });

Category.hasMany(Product);
Product.belongsTo(Category);

Favorite.belongsToMany(User, { through: "FavUser" });
User.belongsToMany(Favorite, { through: "FavUser" });

/* RELACIÓN ENTRE PRODUCTO Y REVIEW */
Product.hasMany(Review);
Review.belongsTo(Product);
/* RELACIÓN ENTRE USUARIO Y REVIEW */


module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
