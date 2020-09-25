const pool = require('../utils/pool');

module.exports = class Character {
    id;
    role;
    actor;
    film;

    constructor(row) {
      this.id = row.id;
      this.role = row.role;
      this.actor = row.actor;
      this.film = row.film;
    }


    static async insert(character) {
      const { rows } = await pool.query(
        'INSERT INTO characters ("role", actor, film) VALUES ($1, $2, $3) RETURNING *',
        [character.role, character.actor, character.film]
      );

      return new Character(rows[0]);
    }
    static async getCastByFilmId(filmId) {
      const { rows } = await pool.query(`
        SELECT films.id, actors.id AS actor_id, actors.name, characters.role
        FROM films
        INNER JOIN characters ON films.id=characters.film
        INNER JOIN actors ON actors.id=characters.actor
        WHERE films.id=$1
      `, [filmId]);

    
      return rows.map(character => ({ id: Number(filmId), role: character.role, actor: { id: character.actor_id, name: character.name } }));
      

    }
};
