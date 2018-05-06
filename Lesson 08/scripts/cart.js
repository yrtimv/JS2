// Create item slots.
const basket = {items: [], totalPrice: 0};
const arrItems = [
	{name: 'Casual shoes', price: 100},
	{name: 'Sneakers', price: 125},
	{name: 'T-shirt', price: 150},
	{name: 'Sweatpants', price: 140},
	{name: 'Bandana', price: 70},
	{name: 'Jaket', price: 160}
];

function addItem(basket, itemNums) {
	itemNums.forEach(num => {
		basket.items.push(arrItems[num]);
		basket.totalPrice += arrItems[num].price;
	});
}

function getBasketItemCount(basket) {
	return basket.items.length;
}

function getBasketTotalPrice(basket) {
	return basket.totalPrice;
}

function clearBasket(basket) {
	basket.items.length = 0;
	basket.totalPrice = 0;
}
