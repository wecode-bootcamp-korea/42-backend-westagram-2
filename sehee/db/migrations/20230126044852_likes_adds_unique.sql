-- migrate:up
ALTER TABLE likes
ADD CONSTRAINT constraint_likes_unique UNIQUE (userId, postId)

-- migrate:down
DROP TABLE likes;
