CREATE TABLE IF NOT EXISTS store
(
    store_id       INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_name     VARCHAR(50)  NOT NULL,
    store_location VARCHAR(200) NOT NULL,
    CONSTRAINT store_name_location_uniq UNIQUE (store_name, store_location)
);

INSERT INTO store (store_name, store_location)
VALUES ('Zane-mart', 'Oklahoma City'),
       ('Jane-mart', 'Norman'),
       ('Mark-mart', 'Moore');
