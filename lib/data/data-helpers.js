const fs = require('fs');
const pool = require('../lib/utils/pool');
const seed = require('./seed');

beforeEach(() => {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
});

beforeEach(() => {
  return seed();
});
