const pool = require('../utils/pool');

module.exports = class Review {
    id;
    rating;
    reviewer;
    review;
    film;

    constructor(row) {
      this.id = row.id;
      this.rating = row.rating;
      this.reviewer = row.reviewer;
      this.review = row.review;
      this.film = row.film;
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM reviews ORDER BY rating DESC LIMIT 100'
      );

      return rows.map(row => new Review(row));
    }

    static async insert(review) {
      const { rows } = await pool.query(
        'INSERT INTO reviews (rating, reviewer, review, film) VALUES ($1, $2, $3, $4) RETURNING *',
        [review.rating, review.reviewer, review.review, review.film]
      );

      return new Review(rows[0]);
    }

    static async delete(id) { 
      const { rows } = await pool.query('DELETE FROM reviews WHERE id=$1 RETURNING *', [id]); 
      return new Review(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM reviews WHERE id=$1',
        [id]
      );

      if(!rows[0]) return null;
      return new Review(rows[0]);
    }

    static async findByFilmId(id) {
      const { rows } = await pool.query(
        `SELECT reviews.id, reviews.rating, reviews.review, reviews.film, reviewers.name, reviewers.id as reviewer_id
        FROM reviews 
        INNER JOIN reviewers 
        ON reviews.reviewer=reviewers.id
        WHERE reviews.film=$1`, [id]
      );

      const mappedReviews = rows.map(review => ({
        id: review.id,
        rating: review.rating,
        review: review.review,
        reviewer: { id: review.reviewer_id, name: review.name }
      }));
      return mappedReviews;
    } 
};
