//================================================================
                    //Exercice 2 :
//================================================================

const products = [
{ name : 'Keyboard ', price : 45 } ,
{ name : 'Monitor ', price : 320 } ,
{ name : 'Mouse ', price : 25 }
];

//1. Using destructuring, unpack name and price from the first product and print them to
//console.

const{ name , price }= products[0];
console.log(`Product name: ${name}, Product price: ${price}`);

//2. Using find, locate the item named ’Mouse’ and log its price.

const mouse = products.find(p => p.name === 'Mouse ');
console.log(mouse.price);

//3. Using filter, return and log all products with a price strictly below 100.
const prod_filtered = products.filter(p => p.price < 100);
console.log(prod_filtered);

//4. Write an arrow function withDiscount taking a price and returning that price discounted
//by 10%. Log the result of withDiscount(320).
const new_price = (price) => price * 0.9;
console.log(new_price(320));