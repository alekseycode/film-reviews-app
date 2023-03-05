const knex = require('knex');

async function connectToDB() {
  const db = knex({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 0,
      max: 5
    }
  });

  try {
    await db.raw('select 1+1 as result');
    console.log('Connected to database');
  } catch (e) {
    console.error('Failed to connect to database', e);
    db.destroy();
    return;
  }

  return db;
}

module.exports = connectToDB;
