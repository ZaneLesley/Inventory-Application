CREATE TABLE IF NOT EXISTS categories
(
    category_id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id               INT NOT NULL,
    entity_name  VARCHAR(50) NOT NULL,
    category_name          VARCHAR(50),
    FOREIGN KEY (store_id, entity_name)
        REFERENCES entity_type (store_id, product_category_name)
);
