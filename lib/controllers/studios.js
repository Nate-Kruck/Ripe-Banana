const { Router } = require('express');
const Studio = require('../models/studio');

module.exports = Router()
//   .post('/', uploadFile.single('video'), (req, res, next) => {
//     Video
//       .insert({ ...req.body, s3Key: req.file.key })
//       .then(video => res.send(video))
//       .catch(next);
//   })

//   .get('/:id', (req, res, next) => {
//     Video
//       .findById(req.params.id)
//       .then(video => res.send(video))
//       .catch(next);
//   })

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
