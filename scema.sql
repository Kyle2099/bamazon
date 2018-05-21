DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity DECIMAL(10,4) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Ice cream", "Grocery", 5.00, 5277),
("Tie Dye Shirt", "Clothing", 57.00, 529),
("Bench Press", "Sports", 56.00, 5221),
("Nike Shoes", "Clothing", 15.00, 521),
("White T-Shirt", "Clothing", 75.00, 521),
("Milk", "Grocery", 25.00, 2),
("Donuts", "Grocery", 255.00, 2),
("Taco seasoning", "Grocery", 45.00, 8),
("Chicken", "Grocery", 15.00, 34),
("Orange Juice", "Grocery", 25.00, 23),
("Ibuprophen", "Pharmacy", 75.00, 5);


