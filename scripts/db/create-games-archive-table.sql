-- Create Archive Table
DROP TABLE IF EXISTS mafia.GamesArchive;
CREATE TABLE `GamesArchive` (
  `game_id` int(11) NOT NULL AUTO_INCREMENT,
  `game_code` varchar(4) NOT NULL,
  `players` text NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  archived_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB;

-- Set up Stored Proc to move all from Games to Archive
DROP PROCEDURE IF EXISTS mafia.ArchiveGames;
DELIMITER //

CREATE PROCEDURE ArchiveGames()
BEGIN
    SET @Expired = DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 3 HOUR);
    Insert into GamesArchive (game_code,players,created_at,updated_at)
    Select game_code,players,created_at,updated_at from Games where updated_at < @Expired;
    Delete from Games where updated_at < @Expired;
END //

DELIMITER;