-- migrate:up
ALTER TABLE users 
 MODIFY email VARCHAR(100) NOT NULL UNIQUE, 
 MODIFY password VARCHAR(200) NOT NULL
;

-- migrate:down
DROP TABLE users;
