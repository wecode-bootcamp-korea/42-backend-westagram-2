-- migrate:up
ALTER TABLE likes DROP FOREIGN KEY likes_ibfk_1;
ALTER TABLE likes DROP FOREIGN KEY likes_ibfk_2;
ALTER TABLE likes ADD FOREIGN KEY (user_id) references users (id) ON DELETE CASCADE;
ALTER TABLE likes ADD FOREIGN KEY (post_id) references posts (id) ON DELETE CASCADE;

-- migrate:down

