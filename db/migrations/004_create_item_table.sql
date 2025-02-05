CREATE TABLE IF NOT EXISTS item
(
    item_id     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id INT,
    item_name   VARCHAR(200),
    FOREIGN KEY (category_id) REFERENCES categories (category_id)
)