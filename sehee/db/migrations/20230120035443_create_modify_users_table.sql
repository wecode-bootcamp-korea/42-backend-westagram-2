-- migrate:up
ALTER TABLE users
MODIFY COLUMN email VARCHAR(100) UNIQUE NOT NULL

-- migrate:down
DROP TABLE users;
