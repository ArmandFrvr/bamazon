# Bamazon
**Bamazon** is a command-line interface storefront.  It uses a MySQL database to record transactions.

## Installation
1. Use the script.sql file to create the database and fill it with some sample values.
1. Edit the connection information in the database.js file to point to your database.
1. From the command prompt, type `npm install`.

## Customer View
The customer view allows users to enter the item they want to buy, and the desired quantity.  If the transaction is successful, the total purchase price will be displayed.

![Successful purchase transaction](/images/cust-success.png)

If the user enters invalid input, or if the desired quantity is not available, Bamazon will display an appropriate error message and allow the user to make a different selection.

![Failed transaction attempts](/images/cust-errors.png)
