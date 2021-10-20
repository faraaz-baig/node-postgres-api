CREATE DATABASE todo_database; -- \c into todo_database


CREATE TABLE todo( todo_id SERIAL PRIMARY KEY,
                                          task VARCHAR(255));