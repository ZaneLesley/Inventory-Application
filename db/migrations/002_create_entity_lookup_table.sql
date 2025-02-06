CREATE TABLE IF NOT EXISTS entity_lookup
(
    entity_id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    entity_name varchar(50) NOT NULL,
    CONSTRAINT entity_name_uniq UNIQUE (entity_name)
);

INSERT INTO entity_lookup (entity_name)
VALUES ('Product'),
       ('Employee'),
       ('User'),
       ('Consumer');
