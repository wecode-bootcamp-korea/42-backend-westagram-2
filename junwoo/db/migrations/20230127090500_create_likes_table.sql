-- migrate:up
CREATE TABLE likes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT likes_post_id_fkey FOREIGN KEY(post_id) REFERENCES posts(id),
  CONSTRAINT likes_user_id_fkey FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT likes_ukey UNIQUE KEY (post_id, user_id)
)

-- migrate:down
DROP TABLE likes
