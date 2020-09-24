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

  it('gets a studio by id via GET', async() => {
    const studio = (await Studio.find())[0];
    const response = await request(app)
      .get(`/api/v1/studios/${studio.id}`);
  
    expect(response.body).toEqual(studio);
  });

  it('creates a studio', async() => {
    return await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'WB studios',
        city: 'LA',
        state: 'CA',
        country: 'USA'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'WB studios',
          city: 'LA',
          state: 'CA',
          country: 'USA'
        });
      });
  });
});
