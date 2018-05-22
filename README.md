In this application I have created an Amazon-like storefront with the MySQL skills that I have learned. The app will take in orders from customers and deplete stock from the store's inventory. I have you programed the app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

This is a CLI application. The application can be found at https://github.com/Kyle2099/bamazon

The Customer View -

The products table inside of the database stores the 
item_id
product_name
department_name
price and the stock_quantity.

The application prompts users with three questions.

Please enter the Item ID which you would like to purchase.

How many do you need?

If there is not enough in stock the user will recieve this.

How many do you need? 5000
Sorry, Insufficient quantity! Please check back later.
Please modify your quantity.

Would you like to continue? (Y/n)

In the Manager View-

There is a list of menu options

- View products for sale -
The app should list every available item: the item IDs, names, prices, and quantities.
- View Low inventory -
The app lists all items with an inventory count lower than one hundred.
-Add to Inventory -
The app displays a prompt that will let the manager "add more" of any item currently in the store.
- Add New product -
The app allows the manager to add a completely new product to the store.

The Supervisor View - 

When a supervisor selects View Product Sales by Department, the app will display a summarized table in their terminal/bash window. 

The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. But instead uses custom alias. 
Using GROUP BYs and JOINS.

Using npm Console.table  to set up the table structure. 