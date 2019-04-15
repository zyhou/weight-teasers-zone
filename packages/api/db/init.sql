CREATE TABLE zones (
	id serial PRIMARY KEY,
  	name VARCHAR (50) UNIQUE NOT NULL
);

CREATE TABLE teasers (
	id serial PRIMARY KEY,
  	name VARCHAR (50) UNIQUE NOT NULL
);

CREATE TABLE zones_teasers (
	zones_id int REFERENCES zones (id) ON UPDATE CASCADE ON DELETE CASCADE,
	teasers_id int REFERENCES teasers (id) ON UPDATE CASCADE ON DELETE CASCADE,
	weight numeric NOT NULL DEFAULT 1,
	CONSTRAINT zones_teasers_pkey PRIMARY KEY (zones_id, teasers_id)
);

INSERT INTO zones (name)
VALUES ('zone_1'), ('zone_2');

INSERT INTO teasers (name)
VALUES ('teaser_1'), ('teaser_2'), ('teaser_3');

INSERT INTO zones_teasers (zones_id, teasers_id, weight)
VALUES
	(1, 1, 1),
	(1, 2, 2),
    (1, 3, 3),
    (2, 1, 1);

-- https://www.db-fiddle.com/f/cu1EseTemqYAJmGHwzMaLi/15

-- remove
-- update zones_teasers
-- set weight = zones_teasers.weight - 1
-- where zones_teasers.weight > 2
--   and zones_teasers.zones_id = 1;

-- add
-- update zones_teasers
-- set weight = zones_teasers.weight + 1
-- where zones_teasers.weight >= 1
--   and zones_teasers.zones_id = 2
--   and zones_teasers.teasers_id != 3;
