/* eslint-env browser */
'use strict';


// Task 1-2.
// jQuery-UI: Add a datepicker field for birthday.



$(document).ready(() => {
	// Validate form fields.
	function validateFields(fieldData) {
		let $fieldElem,fieldVal;
		const invalidField = fieldData.find((val) => {
			$fieldElem = $(`#${val[0]}`);
			fieldVal = $fieldElem.val().trim();
			$fieldElem.val(fieldVal);
			
			return !val[1].test(fieldVal);
		});
		
		if (invalidField) {
			const $dialog = $('#errorMessageDialog');
			const effects = ['bounce', 'highlight', 'pulsate', 'shake'];

			// Prepare error message dialog.
			$('p', $dialog).html(
				`Invalid data in the <span class='fieldName'>${invalidField[0].toUpperCase()}</span> field.`);
			
			$dialog.dialog(
				'option', 'position',
				{my: 'left top', at: 'left bottom', of: $fieldElem[0]});
			
			// Highlight error form field and show dialog.
			$fieldElem.addClass('invalidField', 300);
			$fieldElem.effect(
				effects[Math.floor(Math.random() * effects.length)],
				null, 400, () => {$dialog.dialog('open');});

			return false;
		}
		
		return true;
	}
	
	$('#form').on('submit', () => {
		const arrFields = [
			['name', /^[a-zа-яё]+$/i],
			['phone', /^\+7 ?\(\d{3}\) ?\d{3}\-\d{4}$/],
			['email', /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
			['birthday', /^\d{4}\/\d{2}\/\d{2}$/],
			['city', /\S+/],
			['message', /\S+/]
		];
		
		// Form fields validation.
		return validateFields(arrFields);
	});

	function inputValueChanged(event) {
		// Hide error message and invalid field highlight.
		$(event.target).removeClass('invalidField', 300);
		$('.validationSuccess').hide();
		$('.validationError').hide();
	}

	$('#errorMessageDialog').dialog({
		autoOpen: false,
		modal: true,
		show: {effect: 'blind', duration: 300},
		buttons: [
			{
				text: 'OK',
				icon: 'ui-icon-check',
				click: function() {
					$(this).dialog('close');
				}
			}
		]
	});
	
	$('#name, #phone, #email, #birthday, #message').on('textchange', inputValueChanged);
	$('#birthday').datepicker({
		dateFormat: 'yy/mm/dd',
		firstDay: 1,
		numberOfMonths: 2
	});
	$('#city').on('textchange', (event) => {
		const cityName = event.target.value.trim();
		const $cityList = $('#cityList');

		inputValueChanged(event);

		// Load city list when 3+ chars entered.
		if (cityName.length > 2) {
			if (!$cityList.html()) {
				$.ajax({
					url: 'https://api.vk.com/api.php?oauth=1&method=database.getCities&v=5.5&country_id=1&need_all=1&q=' + cityName,
					dataType: 'jsonp',
					success: (data) => {
						const $cityList = $('#cityList');
						const cityList = [];

						for (const city of data.response.items) {
							if (cityList.indexOf(city.title) === -1) {
								$('<option>', { value: city.title, label: city.title }).appendTo($cityList);
								cityList.push(city.title);
							}
						}
					},
					error: (err) => {
						console.log(err.statusText);
					}
				});
			}
		} else {
			// Otherwise clear city list.
			$cityList.html('');
		}
	});
	
	// Create item slots.
	const $items = $('.items');
	const arrItemPrice = [100, 125, 150, 140, 175, 160];
	
	arrItemPrice.forEach((price, i) => {
		$items.append(
			$('<div>', {class: 'itemWrapper'})
				.append($('<img>', {
					class: 'itemImage',
					src: `images/item_${i + 1}.png`,
					alt: `Item ${i + 1}`,
					data_price: arrItemPrice[i]}))
				.append($('<p>', {class: 'itemPrice', text: `$${arrItemPrice[i]}`})))
	});
	
	// Drag & Drop behaviour for elements.
	$('.shoppingCart').droppable({
		accept: '.itemImage',
		drop: function (event, ui) {
			$(this)
				.attr('src', $(this).attr('src').replace('empty', 'full'))
				.removeClass('shoppingCartOver')
				.draggable({
					cursor: 'move',
					revert: true
				});
			$('.totalCostValue').text(
				parseInt($('.totalCostValue').text()) +
				parseInt(ui.draggable.attr('data_price')));
			$('.itemsAmount').text(parseInt($('.itemsAmount').text()) + 1);
			$('.emptyCart').css('visibility', 'visible');
		},
		over: function () {
			$(this).addClass('shoppingCartOver');
		},
		out: function () {
			$(this).removeClass('shoppingCartOver');
		}
	});
	
	$('.itemImage').draggable({
		cursor: 'move',
		helper: 'clone'
	});
	
	$('.emptyCart').droppable({
		accept: '.shoppingCart',
		drop: function (event, ui) {
			ui.draggable.attr('src', ui.draggable.attr('src').replace('full', 'empty'));
			$(this)
				.css('visibility', 'hidden')
				.removeClass('emptyCartOver');
			$('.totalCostValue, .itemsAmount').text('0');
		},
		over: function () {
			$(this).addClass('emptyCartOver');
		},
		out: function () {
			$(this).removeClass('emptyCartOver');
		}
	});
});
