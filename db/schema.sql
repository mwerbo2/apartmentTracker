Drop Table IF EXISTS users CASCADE;
CREATE TABLE users (
user_id SERIAL PRIMARY KEY NOT NULL,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
tag_id VARCHAR,
email VARCHAR NOT NULL,
password_digest VARCHAR NOT NULL
);


DROP TABLE IF EXISTS permissions;
CREATE TABLE permissions (
item_id SERIAL PRIMARY KEY NOT NULL,
owner_id INTEGER REFERENCES users (user_id),
item_name TEXT NOT NULL,
item_description VARCHAR,
has_permission INTEGER REFERENCES users (user_id),
last_accessed TIMESTAMP
);


DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
task_id SERIAL PRIMARY KEY NOT NULL,
task_name TEXT NOT NULL,
task_description VARCHAR,
assigned_to INTEGER REFERENCES users (user_id),
deadline VARCHAR,
updated_at VARCHAR,
completed boolean
);


DROP TABLE IF EXISTS status;
CREATE TABLE status (
swipe_id SERIAL PRIMARY KEY NOT NULL,
tag_id VARCHAR NOT NULL,
user_id INTEGER REFERENCES users (user_id),
status VARCHAR NOT NULL
);

DROP TABLE IF EXISTS readings;
CREATE TABLE readings (
reading_id SERIAL PRIMARY KEY NOT NULL,
sensor VARCHAR,
reading_type VARCHAR,
reading_value VARCHAR NOT NULL
);
