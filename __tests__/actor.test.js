const pool = require('../lib/utils/pool');

require('../lib/data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

const Actor = require('../lib/models/actor');

describe('Actor routes', () => {

  it('gets all actors via GET', async() => {
    const actors = await Actor.find();
    const response = await request(app)
      .get('/api/v1/actors');

    expect(response.body).toEqual(expect.arrayContaining(actors.map(actor => ({ ...actor, dob: actor.dob.toISOString() }))));

  });

  it('gets a actor by id via GET', async() => {
    
    const actor = (await Actor.find())[0];
    const response = await request(app).get(`/api/v1/actors/${actor.id}`);
    
    const actorFilms = await pool.query(
      `SELECT films.id as film_id, films.title, films.released
      FROM films 
      INNER JOIN characters 
      ON films.id=characters.film
      WHERE characters.actor=$1
      `, [1]
    );
    
    expect(response.body).toEqual({ ...actor, dob: actor.dob.toISOString(), films: actorFilms.rows });
  });

  it('creates a actor', async() => {
    return await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Some Guy',
        dob: '2020-09-24',
        pob: 'Somewhere'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Some Guy',
          dob: expect.stringContaining('2020-09-24'),
          pob: 'Somewhere'
        });
      });
  });
});
