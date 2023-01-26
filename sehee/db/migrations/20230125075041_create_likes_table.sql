-- migrate:up
CREATE TABLE likes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  postId INT NOT NULL,
  userId INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (postId) REFERENCES posts(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- migrate:down
DROP TABLE likes;
