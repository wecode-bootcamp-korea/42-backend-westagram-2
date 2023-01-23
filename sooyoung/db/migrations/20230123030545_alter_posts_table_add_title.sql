-- migrate:up
ALTER TABLE posts
ADD title VARCHAR(100) NOT NULL AFTER content;

-- migrate:down

