-- Products Table
prod_id (PK)
prod_name
prod_price
-- prod_rating
-- prod_image

-- Cart Table
item_id (PK)
user_id (FK)
prod_id 
prod_name
prod_price
-- prod_rating
-- prod_image

-- User Table
user_id
user_name
user_email
user_password

CREATE TABLE cart (
    item_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name VARCHAR(255) NOT NULL,
    product_price NUMERIC(10,2) DEFAULT 0,
    product_quantity INT NOT NULL,
    created_on TIMESTAMP DEFAULT Now(),
    product_id uuid,
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    user_id uuid,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE products (
    product_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name VARCHAR(255) NOT NULL,
    product_price NUMERIC(10,2) DEFAULT 0,
    previous_price NUMERIC(10,2) DEFAULT 0
);

CREATE TABLE subscribers (
    subscriber_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscriber_email VARCHAR(255) NOT NULL,
    added_on TIMESTAMP DEFAULT Now()
);

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP DEFAULT Now(),
    last_login TIMESTAMP DEFAULT Now()
);

INSERT INTO products(product_name, product_price) VALUES('Police Sunglasses', 450.00);
INSERT INTO products(product_name, product_price) VALUES('NoName Sunglasses', 300.00);
INSERT INTO products(product_name, product_price) VALUES('Police Spectacles', 450.00);
INSERT INTO products(product_name, product_price) VALUES('Police Catty Design', 500.00);

