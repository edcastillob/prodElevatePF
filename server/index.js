const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db');
const PORT = 3001;

conn.sync({ force: false }).then(() => {
server.listen(PORT, () => {
  console.log(`prodElevate Server listening in port ${PORT}...`);
  
})
}).catch(error => console.error(error))
