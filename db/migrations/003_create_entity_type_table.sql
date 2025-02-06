CREATE TABLE IF NOT EXISTS entity_type
(
    entity_type_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id       INT NOT NULL,
    entity_id      INT NOT NULL,
    FOREIGN KEY (store_id) REFERENCES store (store_id),
    FOREIGN KEY (entity_id) REFERENCES entity_lookup (entity_id)
);
