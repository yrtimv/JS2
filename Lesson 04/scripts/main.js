/* eslint-env browser */
"use strict";


// Task 1.
function setTabsClickable(state = true) {
	$(".tab").data("clickable", state);
}

$(".tab").on("click", function() {
	const $tab = $(this);

	if ($tab.prop("id") === $(".tabActive").prop("id") || !$tab.data("clickable")) {
		return;
	}

	setTabsClickable(false);

	// Deactivate active and activate selected tab.
	$(".tabActive").removeClass("tabActive");
	$(this).addClass("tabActive");

	const $content = $(".tabContentInner");

	$content.fadeOut(($content.data("content") ? 250 : 0), () => {
		$.getJSON("scripts/tabContent.json", (data) => {
			// Prepare tab content.
			const $content = $(".tabContentInner");
			const activeTabId = $(".tabActive").prop("id");

			$content
				.html(data[activeTabId])
				.fadeIn(($content.data("content") ? 250 : 0), () => {
					setTabsClickable();
				})
				.data("content", "true");
		});
	});
});

// Activate 1st tab.
$("#tab1").click();


// Task 2-3.
// RegExp: Validate form input data.
// AJAX: Get city list.
$("#form").on("submit", () => {
	const errorFields = [];
	const $name = $("#name");
	const regexpName = /^[a-zа-яё]+$/i;
	const $phone = $("#phone");
	const regexpPhone = /^\+7 ?\(\d{3}\) ?\d{3}\-\d{4}$/;
	const $email = $("#email");
	const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const $city = $("#city");
	const $message = $("#message");
	const regexpMessage = /\S+/;
		
	// Name field validation.
	$name[0].value = $name[0].value.trim();
	
	if (!regexpName.test($name[0].value)) {
		errorFields.push($name);
	}
	
	// Phone field validation.
	$phone[0].value = $phone[0].value.trim();
	
	if (!regexpPhone.test($phone[0].value)) {
		errorFields.push($phone);
	}
	
	// Email field validation.
	$email[0].value = $email[0].value.trim();
	
	if (!regexpEmail.test($email[0].value)) {
		errorFields.push($email);
	}
	
	// City field validation.
	$city[0].value = $city[0].value.trim();
	
	if (!$city[0].value || !regexpMessage.test($city[0].value)) {
		errorFields.push($city);
	}
	
	// Text field validation.
	$message[0].value = $message[0].value.trim();
	
	if (!$message[0].value || !regexpMessage.test($message[0].value)) {
		errorFields.push($message);
	}
	
	if (errorFields.length) {
		// Show error text.
		$(".validationError").show();
		
		// Highlight invalid fields.
		for (const field of errorFields) {
			field.addClass("invalidField");
		}

		// Cancel form submit.
		return false;
	}
	
	$(".validationSuccess").show();
});

function inputValueChanged(event) {
	// Hide error message and invalid field highlight.
	$(event.target).removeClass("invalidField");
	$(".validationSuccess").hide();
	$(".validationError").hide();
}

$("#name").on("textchange", inputValueChanged);
$("#phone").on("textchange", inputValueChanged);
$("#email").on("textchange", inputValueChanged);
$("#message").on("textchange", inputValueChanged);
$("#city").on("textchange", (event) => {
	inputValueChanged(event);
	
	const cityName = event.target.value.trim();
	const $cityList = $("#cityList");
	
	// Load city list when 3+ chars entered.
	if (cityName.length > 2) {
		if (!$cityList.html()) {
			$.ajax({
				url: "https://api.vk.com/api.php?oauth=1&method=database.getCities&v=5.5&country_id=1&need_all=1&q=" + cityName,
				dataType: "jsonp",
				success: (data) => {
					const $cityList = $("#cityList");
					const cityList = [];

					for (const city of data.response.items) {
						if (cityList.indexOf(city.title) === -1) {
							$("<option>", { value: city.title, label: city.title }).appendTo($cityList);
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
		$cityList.html("");
	}
});
