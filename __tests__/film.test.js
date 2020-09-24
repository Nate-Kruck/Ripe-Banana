require('../lib/data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

const Film = require('../lib/models/film');
const Actor = require('../lib/models/actor');

describe('Film routes', () => {

  it('gets all films via GET', async() => {
    const films = await Film.find();
    const response = await request(app)
      .get('/api/v1/films');

    expect(response.body).toEqual(expect.arrayContaining(films));
  });

  it('gets a film by id via GET', async() => {
    const film = (await Film.find())[0];
    
    const response = await request(app)
      .get(`/api/v1/films/${film.id}`);
        
    expect(response.body).toEqual(film);
  });

  it('creates a film', async() => {
    const testActor = (await Actor.find())[0];
    const testActor2 = (await Actor.find())[1];

    return await request(app)
      .post('/api/v1/films')
      .send({
        title: 'Some Film',
        studio: 1,
        released: 2020,
        casting: [
          { role: 'bob', actor: testActor.id },
          { role: 'bill', actor: testActor2.id }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          title: 'Some Film',
          studio: '1',
          released: 2020,
          casting: [
            { role: 'bob', actor: expect.any(String) },
            { role: 'bill', actor: expect.any(String) }
          ]
        });
      });
  });
});
