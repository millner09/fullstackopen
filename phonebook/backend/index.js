var morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const mongoose = require('mongoose')
const Person = require('./models/person')
require('dotenv').config()


const app = express();
app.use(cors());
app.use(express.json());

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((people) => {
      response.json(people);
    })
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      }
      else {
        response.status(404).end();
      }
    })
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
});

app.put("/api/persons/:id", (request, response) => {
  Person.updateOne({ id: request.params.id }, { ...request.body })
    .then((updatedPerson) => {
      console.log(updatedPerson)
    })
})

app.get("/info", (request, response) => {
  const now = new Date();
  Person.find({})
    .then((people) => {
      const count = people.length;
      response.send(`<p>Phonebook has info for ${count} people</p><p>${now}</p>`);
      response.status(200).end();
    })

});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "please provide name and number",
    });
  }

  Person.findOne({ name: body.name })
    .then((person) => {
      if (person) {
        return response.status(400).json({
          error: "name must be unique",
        });
      }

      const person = new Person({
        name: body.name,
        number: body.number
      })

      person.save()
        .then((savedPerson) => {
          response.json(savedPerson);
        })
    })
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
