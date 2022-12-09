const express = require("express");
const app = express();
const db = require("./models");
// const Users = require("./models");

const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  //Simply reading(from req.body) & storing the values username & password in the same-named variables.

  //   console.log(Users);

  bcrypt.hash(password, 10).then((hash) => {
    db["users"]
      .create({
        username: username,
        password: hash,
      })
      .then(() => {
        res.json("User Registered");
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  });
  /*
  1-bcrypt.hash() fn has 2 argumets. 1st-What to hash & 2nd-A number which directly refers how strong the hashing needs to be
  2-bcrypt.hash() fn returns a promise with a hashed value which we are reading as a "hash" parameter
  3-Creating "Users" in database with the credentials of username & hashed password
  4-simple .then & .catch inside to inform if registration was successful or not.
  */
});

app.post("/login", (req, res) => {
  res.json("login");
});

app.get("/profile", (req, res) => {
  res.json("profile");
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Listening on port 3001....!");
  });
});
