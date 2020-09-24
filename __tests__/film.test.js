require('../lib/data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

const Film = require('../lib/models/film');

describe.skip('Film routes', () => {

  it('gets all actors via GET', async() => {
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
    return await request(app)
      .post('/api/v1/films')
      .send({
        title: 'Some Film',
        studio: 'Some Studio',
        release: 'Some Time',
        cast: []
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
