CREATE TABLE IF NOT EXISTS categories
(
    category_id    INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    entity_type_id INT NOT NULL,
    category_name VARCHAR (50),
    FOREIGN KEY (entity_type_id) REFERENCES entity_type (entity_type_id),
    CONSTRAINT category_name_entity_type_id_uniq UNIQUE (category_name, entity_type_id)
);