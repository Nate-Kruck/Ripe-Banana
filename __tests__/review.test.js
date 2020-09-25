require('../lib/data/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/review');
const Reviewer = require('../lib/models/reviewer');

describe('Review routes', () => {

  it('gets top 100 reviews via GET', async() => {
    const reviews = await Review.find();
    const response = await request(app)
      .get('/api/v1/reviews');

    expect(response.body).toEqual(expect.arrayContaining(reviews));
  });


  it('creates a review', async() => {
    const reviewer = (await Reviewer.find())[0];
    
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        reviewer: Number(reviewer.id),
        review: 'Some comparate mess',
        film: 4
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          rating: 3,
          reviewer: reviewer.id,
          review: 'Some comparate mess',
          film: '4'
        });
      });
  });

  it('Deletes a review', async() => {
    const reviewer = (await Reviewer.find())[0];
    
    const review = (await Review.insert({
      rating: 3,
      reviewer: Number(reviewer.id),
      review: 'Some comparate mess',
      film: 4
    }));
    return request(app)
      .delete(`/api/v1/reviews/${review.id}`)
      .then(res => expect(res.body).toEqual({
        id: expect.any(String),
        rating: 3,
        reviewer: reviewer.id,
        review: 'Some comparate mess',
        film: '4'
      }));
  });
});
