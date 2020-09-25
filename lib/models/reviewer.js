const pool = require('../utils/pool');

module.exports = class Reviewer {
    id;
    name;
    company;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.company = row.company;
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM reviewers'
      );

      return rows.map(row => new Reviewer(row));
    }

    static async insert(reviewer) {
      const { rows } = await pool.query(
        'INSERT INTO reviewers (name, company) VALUES ($1, $2) RETURNING *',
        [reviewer.name, reviewer.company]
      );

      return new Reviewer(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM reviewers WHERE id=$1',
        [id]
      );

      if(!rows[0]) return null;
      return new Reviewer(rows[0]);
    }

    static async delete(id) { 
      const reviews = await pool.query('SELECT * FROM reviews WHERE reviewer=$1', [id]);

      if(reviews.rows.length > 0) {
        return { message: 'You Cannot Delete That Reviewer' };
      } else {
        const { rows } = await pool.query('DELETE FROM reviewers WHERE id=$1 RETURNING *', [id]);
        return new Reviewer(rows[0]); 
      }
    }

    static async update(id, reviewer) { 
      const { rows } = await pool.query('UPDATE reviewers SET name=$1, company=$2 WHERE id=$3 RETURNING * ', 
        [reviewer.name, reviewer.company, id]);
      return new Reviewer(rows[0]); }
};
