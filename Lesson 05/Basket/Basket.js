function Basket(id) {
	this.id = id;
	this.countGoods = 0; // Количество товаров в корзине
	this.amount = 0; // Общая стоимость товаров
	this.basketItems = []; // Товары, которые находятся в корзине

	this.getBasket()
}

/**
 * Отрисовка корзины
 * @param root - Контейнер под корзину
 */
Basket.prototype.render = function (root) {
	var basketDiv = $('<div />', {
		id: this.id,
		text: 'Корзина'
	});

	var basketItemsDiv = $('<div />', {
		id: this.id + '_items'
	});

	basketItemsDiv.appendTo(basketDiv);
	basketDiv.appendTo(root);
};

/**
 * Получение товаров с сервера (из JSON файла)
 */
Basket.prototype.getBasket = function () {
	var appendId = '#' + this.id + '_items';

	// Способ 1
	// var self = this;
	$.get({
		url: './basket.json',
		dataType: 'json',
		context: this, // Способ 2
		success: function (data) {
			// console.log(this); // Что здесь выведется?
			var basketData = $('<div />', {
				id: 'basket_data'
			});
			
			this.countGoods = data.basket.length;
			this.amount = data.amount;
			this.basketItems = data.basket;

			// Вывод информации в DOM
			basketData.appendTo(appendId);

			// Перерисовка корзины
			this.refresh();
		},
		error: function (error) {
			console.error('Ошибка получения корзины', error.status, error.statusText);
		}
	});
};

/**
 * Метод добавления товара в корзину
 * @param idProduct - ID товара
 * @param price - Цена товара
 */
Basket.prototype.add = function (idProduct, price) {
	var basketItem = {
		id_product: idProduct,
		price: price
	};

	this.countGoods++;
	this.amount += price;
	this.basketItems.push(basketItem);

	// Перерисовка корзины
	this.refresh();
};

/**
 * Метод перерисовки корзины
 */
Basket.prototype.refresh = function () {
	var basketDataDiv = $('#basket_data');
	
	basketDataDiv.empty();
	basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
	basketDataDiv.append('<p>Сумма: ' + this.amount + '</p>');
};

/**
 * Метод удаления товара из корзины
 * @param idProduct - ID товара
 * @return int - остаток ед. товара в корзине
 */
Basket.prototype.remove = function (idProduct, price) {
	if (!this.countGoods) {
		return;
	}
	
	for (let i = this.countGoods - 1; i >= 0; i--) {
		if (this.basketItems[i].id_product !== idProduct) {
			continue;
		}
		
		this.basketItems.splice(i, 1);
		this.countGoods--;
		this.amount -= price;

		// Перерисовка корзины
		this.refresh();

		break;
	}
	
	return this.countGoods;
};
