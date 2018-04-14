/* eslint-env browser */
"use strict";


// Basic classes.
function Container() {
	this.id = "";
	this.className = "";
	this.htmlCode = "";
}

Container.prototype.render = function () {
	return this.htmlCode;
}


function Menu(my_id, my_class, my_items) {
	Container.call(this);
	
	this.id = my_id;
	this.className = my_class;
	this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function () {
	let result = "<ul class=\"" + this.className + "\" id=\"" + this.id + "\">";
	
	for (let item in this.items) {
		if (this.items[item] instanceof MenuItem) {
			result += this.items[item].render();
		}
	}
	
	result += "</ul>";
	
	return result;
}


// Task 1.
// Function remove (removes an element by its id).
Container.prototype.remove = function (outputId) {
	let elem = document.getElementById(this.id);
	
	if (elem) {
		document.getElementById(outputId).innerHTML = "Element with id \"" + this.id + "\" removed from its parent element (id \"" + elem.parentElement.id + "\").";
		elem.parentElement.removeChild(elem);
	}
}

function MenuItem(my_href, my_name, my_id) {
	Container.call(this);
	
	this.className = "menu-item";
	this.href = my_href;
	this.name = my_name;
	this.id = my_id;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function () {
	return "<li class=\"" + this.className + "\" href=\"" + this.href + "\" id=\"" + this.id + "\">" + this.name + "</li>";
}

let m_item1 = new MenuItem("/", "Main", "main");
let m_item2 = new MenuItem("/catalogue/", "Catalogue", "catalogue");
let m_item3 = new MenuItem("/gallery/", "Gallery", "gallery");
let m_items = { 0: m_item1, 1: m_item2, 2: m_item3 };

let menu = new Menu("my_menu", "menu_class", m_items);
let menu1 = new Menu("new_menu", "menu_class", m_items);

document.write(menu.render());
document.write(menu1.render());



// Task 2.
// New class AdvMenu.

function AdvMenu(my_id, my_class, my_items) {
	Menu.call(this, my_id, my_class, my_items);
}

AdvMenu.prototype = Object.create(Menu.prototype);
AdvMenu.prototype.constructor = AdvMenu;
AdvMenu.prototype.render = function () {
	let result = "<ul class=\"" + this.className + "\" id=\"" + this.id + "\">";
	
	for (let item in this.items) {
		if (this.items[item] instanceof MenuItem || this.items[item] instanceof Menu) {
			result += this.items[item].render();
		}
	}
	
	result += "</ul>";
	
	return result;
}

let m_item4 = new MenuItem("/social/", "Social", "social");
let m_item5 = new MenuItem("/terms/", "Terms & conditions", "terms");
let am_item1 = new MenuItem("/contacts/", "Contacts", "contacts");
let am_item2 = new MenuItem("/map/", "Map", "map");
let am_item3 = new MenuItem("/blog/", "Blog", "blog");
let sm_items_adv = { 0: am_item1, 1: am_item2, 2: am_item3 };
let am_submenu = new Menu("submenu", "menu_class", sm_items_adv);
let am_items_adv = { 0: m_item1, 1: m_item2, 2: m_item3, 3: m_item4, 4: am_submenu, 5: m_item5 };

let advmenu = new AdvMenu("advmenu", "menu_class", am_items_adv);

document.write("<p>New advanced menu with submenus:</p>");
document.write(advmenu.render());
