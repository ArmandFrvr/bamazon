# bamazon
**Bamazon** is a command-line interface storefront.  It uses a MySQL database to record transactions.

## Installation
Use the script.sql file to create the database and fill it with some sample values.
Edit the connection variable in the bamazonCustomer.js file to point to your database.
From the command prompt, type `npm install`

## Customer View
The customer view allows users to enter the item they want to buy, and the desired quantity.  If the transaction is successful, the total purchase price will be displayed.

![Successful purchase transaction](/images/cust-success.png)

![Failed transaction attempts](/images/cust-errors.png)
