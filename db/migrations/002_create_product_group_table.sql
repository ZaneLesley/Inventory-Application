CREATE TABLE IF NOT EXISTS product_group
(
    product_id            INT PRIMARY KEY,
    store_id              INT         NOT NULL,
    product_category_name varchar(50) NOT NULL,
    FOREIGN KEY (store_id) REFERENCES store (store_id)
)