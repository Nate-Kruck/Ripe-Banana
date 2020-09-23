const Video = require('../lib/models/video');

const chance = require('chance').Chance();

module.exports = async({ videoCount = 5 } = {}) => {
  const videosToCreate = [...Array(videoCount)]
    .map(() => ({
      title: chance.animal(),
      description: chance.sentence(),
      s3Key: chance.guid(),
      tags: [chance.hashtag(), chance.hashtag()]
    }));

  await Promise.all(videosToCreate
    .map(video => Video.insert(video)));
};