-- migrate:up
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NULL,
  phoneNumber VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE users;
