DROP TABLE IF EXISTS studios, actors, reviewers, films;

CREATE TABLE studios (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  country TEXT
);

CREATE TABLE actors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  dob TEXT,
  pob TEXT
);

CREATE TABLE reviewers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL
);

CREATE TABLE films (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  studio BIGINT NOT NULL REFERENCES studios(id),
  released NUMERIC NOT NULL,
  casting JSONB[]
);
