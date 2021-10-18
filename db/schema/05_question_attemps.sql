-- Drop and recreate question_scores table

DROP TABLE IF EXISTS question_scores CASCADE;
CREATE TABLE question_scores (
  id SERIAL PRIMARY KEY NOT NULL,
  correct BOOLEAN,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  quiz_attempt_id INTEGER REFERENCES quiz_attempts(id) ON DELETE CASCADE
);