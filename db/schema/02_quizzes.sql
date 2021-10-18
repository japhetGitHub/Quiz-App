-- Drop and recreate quizzes table

DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  public BOOLEAN DEFAULT true,
  quiz_link VARCHAR(255) NOT NULL,
  owner_id INTEGER REFERENCES user(id) ON DELETE CASCADE
);