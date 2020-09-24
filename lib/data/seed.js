const Studio = require('../models/studio');
const Actor = require('../models/actor');
const Reviewer = require('../models/reviewer');
const Film = require('../models/film');

const chance = require('chance').Chance();

module.exports =  async({ studioCount = 5, actorCount = 5, reviewerCount = 5, filmCount = 5 } = {}) => {
  const studiosToCreate = [...Array(studioCount)]
    .map(() => ({
      name: chance.animal(),
      city: chance.city(),
      state: chance.state(),
      country: chance.country(),
    }));

  const studios = await Promise.all(studiosToCreate
    .map(studio => Studio.insert(studio)));

  const actorsToCreate = [...Array(actorCount)]
    .map(() => ({
      name: chance.name(),
      dob: chance.birthday({ string: true }),
      pob: chance.city(),
    }));

  const actors = await Promise.all(actorsToCreate
    .map(actor => Actor.insert(actor)));

  const reviewersToCreate = [...Array(reviewerCount)]
    .map(() => ({
      name: chance.name(),
      company: chance.company(),
    }));

  const reviwers = await Promise.all(reviewersToCreate
    .map(reviewer => Reviewer.insert(reviewer)));

  const filmsToCreate = [...Array(filmCount)]
    .map(() => ({
      title: chance.name(),
      studio: chance.pickone(studios).id,
      released: chance.year(), 
      casting: [
        { role: 'bob', actor: 1 },
        { role: 'bill', actor: 2 }
      ]
    }));

  await Promise.all(filmsToCreate
    .map(film => Film.insert(film)));
};
