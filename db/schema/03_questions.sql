-- Drop and recreate questions table

DROP TABLE IF EXISTS questions CASCADE;
DROP TYPE IF EXISTS answer CASCADE;
CREATE TYPE answer AS ENUM ('choice_1', 'choice_2', 'choice_3', 'choice_4');

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  question VARCHAR(255) NOT NULL,
  correct_answer answer,
  choice_1 VARCHAR(255),
  choice_2 VARCHAR(255),
  choice_3 VARCHAR(255),
  choice_4 VARCHAR(255),
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE
);