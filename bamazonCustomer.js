// String padding polyfils for fxns added in ECMAScript 2017

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return String(this) + padString.slice(0,targetLength);
        }
    };
}

// Currency formatter
const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});


// Create DB connection
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "EYs@&y8zIA9ncH2",
  database: "bamazon"
});

connection.connect(function(err){
  if(err) throw err;

  let query = "SELECT item_id, product_name, price, stock_quantity " +
              "FROM products";

  connection.query(query, function(err, res) {
    if(err) throw err;

    // Display list of available products
    console.log("");
    console.log("   ITEM ID  PRODUCT NAME                         PRICE");
    console.log("   -------  ------------                         -----");

    for(let i = 0; i < res.length; i++){
      console.log(res[i].item_id.toString().padStart(10) + "  "
                  + res[i].product_name.padEnd(30) + "  "
                  + currency.format(res[i].price).padStart(10));
    }
    console.log("");

    // Prompt user for product to purchase
    const inquirer = require("inquirer");
    let productIdx;

    let questions = [{
      type: "input",
      name: "productToBuy",
      message: "Enter the ID of the product you wish to purchase:",
      validate: function(str) {
        for(let i = 0; i < res.length; i++) {
          if(res[i].item_id === parseInt(str)) {

            // If it's not in stock they can't buy this.
            if(res[i].stock_quantity < 1) {
              console.log("\n  This product is not in stock.");
              return false;
            }

            // Product is valid; save index so we don't have to keep searching.
            productIdx = i;
            return true;
          }
        }

        // What they entered wasn't valid
        console.log("\n  Please enter a valid Item ID from the inventory.");
        return false;
      },
      filter: function(str) {
        return parseInt(str);
      }
    },
    {
      type: "input",
      name: "quantityToBuy",
      message: "How many do you want?",
      validate: function(str) {
        // If not a number or not at least 1
        if(!parseInt(str) || parseInt(str) < 1) {
          console.log("\n  Please enter a valid quantity.");
          return false;
        }
        // If they want to buy more than are available
        else if (parseInt(str) > res[productIdx].stock_quantity) {
          console.log("\n  Only " + res[productIdx].stock_quantity
                      + " are in stock.  Please enter a valid quantity.");
          return false;
        }
        return true;
      },
      filter: function(str) {
        return parseInt(str);
      }
    }];

    inquirer.prompt(questions).then(answers => {

      console.log("   Buying " + answers.quantityToBuy + " of \""
                   + res[productIdx].product_name + "\" at "
                   + currency.format(res[productIdx].price) + " each.");

      let updateQuery = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
      let newAmt = res[productIdx].stock_quantity - answers.quantityToBuy;

      connection.query(updateQuery, [newAmt, answers.productToBuy], function(err, res2) {
        if(err) throw err;
        console.log("   Your total is: "
                      + currency.format(res[productIdx].price * answers.quantityToBuy));
      });

      connection.end();
    });
  });
});

