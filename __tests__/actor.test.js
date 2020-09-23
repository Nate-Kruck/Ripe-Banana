require('../lib/data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

const Actor = require('../lib/models/actor');

describe('Actor routes', () => {

  it('gets all actors via GET', async() => {
    const actors = await Actor.find();
    const response = await request(app)
      .get('/api/v1/actors');

    expect(response.body).toEqual(expect.arrayContaining(actors));
  });

  it('gets a actor by id via GET', async() => {
    const actor = (await Actor.find())[0];
    const response = await request(app)
      .get(`/api/v1/actors/${actor.id}`);
  
    expect(response.body).toEqual(actor);
  });

  it('creates a actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Some Guy',
        dob: 'Some Date',
        pob: 'Somewhere'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Some Guy',
          dob: 'Some Date',
          pob: 'Somewhere'
        });
      });
  });
});
