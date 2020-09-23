require('../lib/data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

const Studio = require('../lib/models/studio');

describe('Studio routes', () => {

  it('gets all studios via GET', async() => {
    const studios = await Studio.find();
    const response = await request(app)
      .get('/api/v1/studios');

    expect(response.body).toEqual(expect.arrayContaining(studios));
  });
});
