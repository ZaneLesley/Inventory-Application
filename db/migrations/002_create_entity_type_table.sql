CREATE TABLE IF NOT EXISTS entity_type
(
    product_id            INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id              INT         NOT NULL,
    product_category_name varchar(50) NOT NULL,
    FOREIGN KEY (store_id) REFERENCES store (store_id)
)