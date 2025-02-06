CREATE TABLE IF NOT EXISTS item
(
    item_id     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id INT            NOT NULL,
    item_name   VARCHAR(200)   NOT NULL,
    item_price  DECIMAL(10, 2) NOT NULL,    -- Up to 10 digits, 2 after the decimal
    FOREIGN KEY (category_id) REFERENCES categories (category_id)
);
