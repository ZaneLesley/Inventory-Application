CREATE TABLE IF NOT EXISTS store
(
    store_id       INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_name     VARCHAR(50),
    store_location VARCHAR(200)
)