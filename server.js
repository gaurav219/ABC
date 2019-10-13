const express = require("express");
const knex = require("./knex/knex.js");
const app = express();
//const { Users } = require("./Model");

app.get("/", (req, res) => {
  res.send("Hello world");
  knex.schema
    .hasTable("users")
    .then(function(exists) {
      if (!exists) {
        return knex.schema.createTable("users", function(t) {
          t.increments("id").primary();
          t.string("name", 100);
          t.integer("age");
        });
      }
    })
    // .then(() => console.log('schema created'))
    .then(function() {
      return knex("users").insert([
        { name: "A", age: 1 },
        { name: "B", age: 2 },
        { name: "C", age: 3 },
        { name: "D", age: 4 }
      ]);
    });
});

app.get("/home", (req, res) => {
  knex("user")
    .insert({ name: "John", age: 23 })
    .then(result => {
      res.json({ success: true, message: "ok" }); // respond back to request
    });
  knex("user")
    .where({ age: 4 })
    .then(rows => res.json(rows));
});

app.get("/1", (req, res) => {
  knex.schema
    .hasTable("games")
    .then(function(exists) {
      if (!exists) {
        return knex.schema.createTable("games", function(t) {
          t.increments("id").primary();
          t.string("Name", 100);
          t.string("Genre", 100);
          t.integer("Likes");
        });
      }
    })
    .then(() => {
      return knex("games").insert([
        { Name: "BF3", Genre: "ROG", Likes: 100 },
        { Name: "Outlast", Genre: "Horror", Likes: 200 }
      ]);
    });
  res.send("LOL");
});

app.listen(5000);
