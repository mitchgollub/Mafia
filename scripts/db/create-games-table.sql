DROP TABLE IF EXISTS mafia.Games;

CREATE TABLE IF NOT EXISTS mafia.Games (
    game_id INT AUTO_INCREMENT,
    game_code VARCHAR(4) NOT NULL,
    players TEXT NOT NULL,
    PRIMARY KEY (game_id)
)  ENGINE=INNODB;