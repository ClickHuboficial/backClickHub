const express = require("express");
const cors = require("cors");

const swaggerSetup = require('./app/routes/swagger');


const app = express();


swaggerSetup(app);
app.use(cors());


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// database
// const db = require("./app/models");
// const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });


app.get("/", (req, res) => {
  res.json({ message: "Bem vindo a applicação." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

