/* eslint-env browser */
"use strict";


/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(size, stuffing) {
	Hamburger.SIZE_SMALL = 1;
	Hamburger.SIZE_LARGE = 2;
	Hamburger.STUFFING_CHEESE = 3;
	Hamburger.STUFFING_SALAD = 4;
	Hamburger.STUFFING_POTATO = 5;
	Hamburger.TOPPING_MAYO = 6;
	Hamburger.TOPPING_SPICE = 7;
	
	Hamburger.PROP_DATA = [
		null,
		{ price: 50, calories: 20 },
		{ price: 100, calories: 40 },
		{ price: 10, calories: 20 },
		{ price: 20, calories: 5 },
		{ price: 15, calories: 10 },
		{ price: 20, calories: 5 },
		{ price: 15, calories: 0 }
	];
	
	// Constants for input value validation.
	Hamburger.SIZES = [
		Hamburger.SIZE_SMALL,
		Hamburger.SIZE_LARGE
	];
	Hamburger.STUFFINGS = [
			Hamburger.STUFFING_CHEESE,
			Hamburger.STUFFING_SALAD,
			Hamburger.STUFFING_POTATO
		],
	Hamburger.TOPPINGS = [
		Hamburger.TOPPING_MAYO,
		Hamburger.TOPPING_SPICE
	];
	
	// Return empty object, if no arguments.
	if (!arguments.length) {
		return;
	}
	
	// Input value validation.
	if (!Hamburger.SIZES.includes(size)) {
		throw new HamburgerException("Invalid size value!");
	}
	
	if (!Hamburger.STUFFINGS.includes(stuffing)) {
		throw new HamburgerException("Invalid stuffing value!");
	}
	
	// Hamburger size.
	this.size = size;
	
	// Hamburger stuffing.
	this.stuffing = stuffing;
	
	// Hamburger toppings.
	this.toppings = [];
}

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 * 
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function (topping) {
	if (!Hamburger.TOPPINGS.includes(topping)) {
		throw new HamburgerException("Invalid topping value!");
	}
	
	if (!this.toppings.includes(topping)) {
		this.toppings.push(topping);
	}
}

/**
 * Убрать добавку, при условии, что она ранее была 
 * добавлена.
 * 
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
	if (!Hamburger.TOPPINGS.includes(topping)) {
		throw new HamburgerException("Invalid topping value!");
	}
	
	if (this.toppings.includes(topping)) {
		this.toppings.splice(this.toppings.indexOf(topping), 1);
	}
}

/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
	return this.toppings;
}

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
	return this.size;
}

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
	return this.stuffing;
}

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function () {
	let price = Hamburger.PROP_DATA[this.size].price +  Hamburger.PROP_DATA[this.stuffing].price;
	
	for (let topping of this.toppings) {
		price += Hamburger.PROP_DATA[topping].price;
	}
	
	return price;
}

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
	let calories =  Hamburger.PROP_DATA[this.size].calories +  Hamburger.PROP_DATA[this.stuffing].calories;
	
	for (let topping of this.toppings) {
		calories += Hamburger.PROP_DATA[topping].calories;
	}
	
	return calories;
}

/**
 * Formates numbers with currency style.
 */
const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2
});

/**
 * Calculate order price and calories.
 */
function calculateOrder() {
	const
		elemSizes = document.getElementsByName("size"),
		elemStuffing = document.getElementsByName("stuffing"),
		elemTopping = document.getElementsByName("topping"),
		elemErrorMessage = document.getElementById("errorMessage");
			
	let size, stuffing, hamburger;
	
	for (let elem of elemSizes) {
		if (elem.checked) {
			size = elem.value.toUpperCase();
			break;
		}
	}
	
	for (let elem of elemStuffing) {
		if (elem.checked) {
			stuffing = elem.value.toUpperCase();
			break;
		}
	}
	
	try {
		// Simple object creation for further access of const fields from
		// Hamburger constructor during real object creation.
		new Hamburger();
		
		hamburger = new Hamburger(
			Hamburger["SIZE_" + size],
			Hamburger["STUFFING_" + stuffing]
		);

		for (let elem of elemTopping) {
			if (elem.checked) {
				hamburger.addTopping(
					Hamburger["TOPPING_" + elem.value.toUpperCase()]
				);
			}
		}
		
		document.getElementById("totalPriceValue").innerHTML =
			formatter.format(hamburger.calculatePrice());
		document.getElementById("totalCaloriesValue").innerHTML = hamburger.calculateCalories() + " cal.";
		document.getElementById("totalPriceLabel").style.display = "block";
		document.getElementById("totalCaloriesLabel").style.display = "block";
	}
	catch (error) {
		elemErrorMessage.innerHTML = error.message;
		
		document.getElementById("totalPriceLabel").style.display = "none";
		document.getElementById("totalCaloriesLabel").style.display = "none";
		
		if (elemErrorMessage.style.display !== "inline") {
			elemErrorMessage.style.display = "inline";
		}
	}
}

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
function HamburgerException (message) {
	this.message = message;
}
