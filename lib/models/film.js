const pool = require('../utils/pool');

module.exports = class Film {
    id;
    title;
    studio;
    released;
    
    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.studio = row.studio;
      this.released = row.released;
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT studios.id AS studio_id, studios.name, films.id, films.title, films.released FROM films INNER JOIN studios ON studios.id=films.studio'
      );
      const allFilms = rows;
  
      return allFilms.map(film => { return {
        id: film.id,
        title: film.title,
        released: film.released,
        studio: {
          id: film.studio_id,
          name: film.name
        }
      };});
    }

    static async insert(film) {
      const { rows } = await pool.query(
        'INSERT INTO films (title, studio, released) VALUES ($1, $2, $3) RETURNING *',
        [film.title, film.studio, film.released]
      );


      return new Film(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM films WHERE id=$1',
        [id]
      );

      if(!rows[0]) return null;
      return new Film(rows[0]);
    }
};
