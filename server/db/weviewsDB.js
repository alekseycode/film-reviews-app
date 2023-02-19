const db = require("knex")({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },
    pool: {min: 0, max: 10}
});


Promise.resolve(db).then(() => {
    console.log('Database connected');
  });

module.exports = db;