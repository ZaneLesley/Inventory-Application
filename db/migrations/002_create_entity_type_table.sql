CREATE TABLE IF NOT EXISTS entity_type
(
    store_id              INT         NOT NULL,
    entity_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (store_id, entity_name),
    FOREIGN KEY (store_id) REFERENCES store (store_id)
);
