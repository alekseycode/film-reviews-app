-- Create table for users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
);

-- Create table for sessions
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create table for films
CREATE TABLE IF NOT EXISTS films (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(255) NOT NULL,
  release_year INT NOT NULL,
  summary TEXT NOT NULL,
  actors TEXT NOT NULL,
);


-- Create table for reviews
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  film_id INT NOT NULL,
  rating INT NOT NULL,
  review TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (film_id) REFERENCES films(id)
);
