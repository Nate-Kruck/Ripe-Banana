const { Router } = require('express');
const Film = require('../models/film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .insert(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      .then(films => res.send(films))
      .catch(next);
  });
