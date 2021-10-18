-- Drop and recreate question_scores table

DROP TABLE IF EXISTS question_scores CASCADE;
CREATE TABLE question_scores (
  id SERIAL PRIMARY KEY NOT NULL,
  correct BOOLEAN,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE
);