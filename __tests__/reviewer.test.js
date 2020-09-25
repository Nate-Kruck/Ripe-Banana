require('../lib/data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/review');
const Reviewer = require('../lib/models/reviewer');

describe('Reviewer routes', () => {

  it('gets all actors via GET', async() => {
    const reviewers = await Reviewer.find();
    const response = await request(app)
      .get('/api/v1/reviewers');

    expect(response.body).toEqual(expect.arrayContaining(reviewers));
  });

  it('gets a reviewer by id via GET', async() => {
    const reviewer = (await Reviewer.find())[0];
    const response = await request(app)
      .get(`/api/v1/reviewers/${reviewer.id}`);
  
    expect(response.body).toEqual(reviewer);
  });

  it('creates a reviewer', async() => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Some Guy',
        company: 'Some Corporate monster',
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Some Guy',
          company: 'Some Corporate monster',
        });
      });
  });

  it('Does not delete a reviewer', async() => {
    const reviewer = (await Reviewer.find())[0];

    const review = await Review.insert({
      rating: 3,
      reviewer: reviewer.id,
      review: 'good',
      film: 4
    });
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer.id}`)
      .then(res => expect(res.body).toEqual({ message: 'You Cannot Delete That Reviewer' }));
  });

  it('Deletes a reviewer', async() => {
    const reviewer = (await Reviewer.insert({
      name: 'bob',
      company: 'movies'
    }));
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer.id}`)
      .then(res => expect(res.body).toEqual({
        id: expect.any(String),
        name: 'bob',
        company: 'movies'
      }));
  });

  it('updates a reviewer by id', async() => {
    const reviewer = await Reviewer.insert({
      name: 'Bob',
      company: 'Microsoft'
    });
    return await request(app)
      .put(`/api/v1/reviewers/${reviewer.id}`)
      .send({ name: 'Siskel', company: 'Netflix' })
      .then(res => expect(res.body).toEqual({ id: expect.any(String),name: 'Siskel', company: 'Netflix'}));
  });
});
