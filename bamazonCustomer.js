var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: 'root',
	database: 'bamazonDB',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});


function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}


function promptUserPurchase() {
	// console.log('___ENTER promptUserPurchase___');


	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: validateInput,
			filter: Number
		}
	]).then(function (input) {
		// console.log('Customer has selected: \n    item_id = '  + input.item_id + '\n    quantity = ' + input.quantity);

		var item = input.item_id;
		var quantity = input.quantity;


		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, { item_id: item }, function (err, data) {
			if (err) throw err;


			// console.log('data = ' + JSON.stringify(data));

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];

				// console.log('productData = ' + JSON.stringify(productData));
				// console.log('productData.stock_quantity = ' + productData.stock_quantity);


				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!');


					var uQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
					// console.log('uQuery = ' + uQuery);


					connection.query(uQuery, function (err, data) {
						if (err) throw err;

						console.log('Order processed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with bamazon!');
						console.log("\n----------------------------\n");

						// End the database connection
						
					})
				} else {
					console.log('Sorry, Insufficient quantity! Please check back later.');
					console.log('Please modify your quantity.');
					console.log("\n-----------------------\n");

					// displayInventory();
				}
			}
		})
	})
}


function displayInventory() {
	// console.log('___ENTER displayInventory___');

	queryStr = 'SELECT * FROM products';

	connection.query(queryStr, function (err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}

		console.log("------------\n");


		promptUserPurchase();
	})
}

function runBamazon() {
	// console.log('___ENTER runBamazon___');


	displayInventory();
}


runBamazon();