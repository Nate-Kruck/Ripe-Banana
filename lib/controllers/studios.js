const { Router } = require('express');
const Studio = require('../models/studio');

module.exports = Router()
  .post('/', (req, res) => {
    Studio
      .insert(req.body)
      .then(studio => res.send(studio));
  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .then(studios => res.send(studios))
      .catch(next);
  });

//   .put('/:id', (req, res, next) => {
//     Video
//       .update(req.params.id, req.body)
//       .then(video => res.send(video))
//       .catch(next);
//   })

//   .delete('/:id', (req, res, next) => {
//     Video
//       .delete(req.params.id)
//       .then(video => res.send(video))
//       .catch(next);
//   });
