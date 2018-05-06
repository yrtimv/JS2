describe('Cart validation.', () => {
	it('Add sports cloth items to the cart (4 items).', () => {
		addItem(basket, [1, 2, 3, 4]);

		expect(getBasketItemCount(basket)).toEqual(4);
		expect(getBasketTotalPrice(basket)).toEqual(485);
	});

	it('Add casual cloth items to the cart (2 items).', () => {
		clearBasket(basket);

		addItem(basket, [0, 5]);

		expect(getBasketItemCount(basket)).toEqual(2);
		expect(getBasketTotalPrice(basket)).toEqual(260);
	});
});
