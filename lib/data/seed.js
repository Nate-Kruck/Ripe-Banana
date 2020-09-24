const Studio = require('../models/studio');
const Actor = require('../models/actor');
const Reviewer = require('../models/reviewer');

const chance = require('chance').Chance();

const studioData = async({ studioCount = 5 } = {}) => {
  const studiosToCreate = [...Array(studioCount)]
    .map(() => ({
      name: chance.animal(),
      city: chance.city(),
      state: chance.state(),
      country: chance.country(),
    }));

  await Promise.all(studiosToCreate
    .map(studio => Studio.insert(studio)));
};

const actorData = async({ actorCount = 5 } = {}) => {
  const actorsToCreate = [...Array(actorCount)]
    .map(() => ({
      name: chance.name(),
      dob: chance.birthday({ string: true }),
      pob: chance.city(),
    }));

  await Promise.all(actorsToCreate
    .map(actor => Actor.insert(actor)));
};

const reviewerData = async({ reviewerCount = 5 } = {}) => {
  const reviewersToCreate = [...Array(reviewerCount)]
    .map(() => ({
      name: chance.name(),
      company: chance.company(),
    }));

  await Promise.all(reviewersToCreate
    .map(reviewer => Reviewer.insert(reviewer)));
};

module.exports = { studioData, actorData, reviewerData };
