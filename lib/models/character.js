const pool = require('../utils/pool');

module.exports = class Character {
    id;
    characterName;
    actor;
    film;

    constructor(row) {
      this.id = row.id;
      this.characterName = row.character_name;
      this.actor = row.actor;
      this.film = row.film;
    }


    static async insert(character) {
      const { rows } = await pool.query(
        'INSERT INTO characters (character_name, actor, film) VALUES ($1, $2, $3) RETURNING *',
        [character.characterName, character.actor, character.film]
      );

      return new Character(rows[0]);
    }
};
