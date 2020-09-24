require('../lib/data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

const Film = require('../lib/models/film');

describe('Film routes', () => {

  it('gets all films via GET', async() => {
    const films = await Film.find();
    const response = await request(app)
      .get('/api/v1/films');

    expect(response.body).toEqual(expect.arrayContaining(films));
  });

  it('gets a film by id via GET', async() => {
    const film = (await Film.find())[0];
    console.log(film);
    const response = await request(app)
      .get(`/api/v1/films/${film.id}`);
        
    expect(response.body).toEqual(film);
  });

  it('creates a film', async() => {
    return await request(app)
      .post('/api/v1/films')
      .send({
        title: 'Some Film',
        studio: 1,
        released: 2020,
        casting: [
          { amount: 1, measurement: 'teaspoon', name: 'sugar' },
          { amount: 1, measurement: 'cup', name: 'flour' }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          title: 'Some Film',
          studio: '1',
          released: '2020',
          casting: [
            { amount: 1, measurement: 'teaspoon', name: 'sugar' },
            { amount: 1, measurement: 'cup', name: 'flour' }
          ]
        });
      });
  });
});
