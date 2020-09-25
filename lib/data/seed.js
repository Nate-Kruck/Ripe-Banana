const Studio = require('../models/studio');
const Actor = require('../models/actor');
const Reviewer = require('../models/reviewer');
const Film = require('../models/film');
const Review = require('../models/review');
const Character = require('../models/character');

const chance = require('chance').Chance();

const randomNum = Number(Math.floor(Math.random() * 5));

module.exports =  async({ studioCount = 5, actorCount = 5, reviewerCount = 5, filmCount = 50, reviewsCount = 5, charactersCount = 5 } = {}) => {
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

  const reviewers = await Promise.all(reviewersToCreate
    .map(reviewer => Reviewer.insert(reviewer)));

  const filmsToCreate = [...Array(filmCount)]
    .map(() => ({
      title: chance.name(),
      studio: chance.pickone(studios).id,
      released: chance.year(), 
    }));

  const films = await Promise.all(filmsToCreate
    .map(film => Film.insert(film)));

  const reviewsToCreate = [...Array(reviewsCount)]
    .map(() => ({
      rating: 3,
      reviewer: reviewers[randomNum].id,
      review: chance.animal(), 
      film: films[0].id
    }));

  const reviews = await Promise.all(reviewsToCreate
    .map(review => Review.insert(review)));

  const charactersToCreate = [...Array(charactersCount)]
    .map(() => ({
      characterName: chance.name(),
      actor: chance.pickone(actors).id,
      film: chance.pickone(films).id
    }));

  const characters = await Promise.all(charactersToCreate
    .map(character => Character.insert(character)));
    
};
