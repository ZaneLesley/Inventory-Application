CREATE TABLE IF NOT EXISTS categories
(
    category_id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id    INT,
    category_name VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES product_group (product_id)
)