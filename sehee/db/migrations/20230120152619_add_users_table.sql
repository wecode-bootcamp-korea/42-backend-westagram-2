-- migrate:up
ALTER TABLE users
ADD profileImage VARCHAR(300) NULL

-- migrate:down
DROP TABLE users;
