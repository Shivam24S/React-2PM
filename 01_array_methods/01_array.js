let fruits1 = "apple";
let fruits2 = "banana";
let fruits3 = "cherry";

let fruits = ["apple", "banana", "cherry"];

//loosely type language

let price1 = "10";
let price2 = 10;

console.log(price1 + price2);

// reduce

const shoppingItem = [
  {
    name: "biscuit",
    price: 100,
    qty: 1,
  },
  {
    name: "cold drinks",
    price: 200,
    qty: 2,
  },
    {
    name: "biscuit",
    price: 100,
    qty: 1,
  },
    {
    name: "biscuit",
    price: 100,
    qty: 1,
  },
];

const totalPrice = shoppingItem.reduce(
  (acc, curr) => (acc += curr.qty * curr.price),0
);

console.log("total price", totalPrice);
