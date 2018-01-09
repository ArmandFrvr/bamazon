create database bamazon;

use bamazon;

create table if not exists products(
 item_id integer(10) auto_increment not null,
 product_name varchar(50) not null,
 department_name varchar(50) not null,
 price decimal(10,2) not null,
 stock_quantity integer(10),
 primary key(item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values("Organic Catnip", "Pets", 6.99, 10),
	  ("Catnip Mouse", "Pets", 2.50, 30),
      ("Scratching Post", "Pets", 20.00, 5),
      ("Pet Bed", "Pets", 15.00, 8),
      ("Baby Wipes", "Babies", 2.99, 20),
      ("Laundry Detergent", "Household", 5.99, 6),
      ("Eco-Friendly Laundry Detergent", "Household", 7.99, 0),
      ("Dish Soap", "Household", 2.99, 8),
      ("Shampoo", "Personal Care", 2.95, 3),
      ("Soap", "Personal Care", 1.99, 2);
