\c tuner;

INSERT INTO albums (title, artist, is_favorite)
VALUES
('Love, Damini', 'Burna Boy', true);

INSERT INTO songs (album_id, name, artist, album, time, is_favorite)
VALUES 
('1', 'Its Plenty', 'Burna Boy', 'Love, Damini', '3:00', true);