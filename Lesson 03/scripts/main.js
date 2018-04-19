/* eslint-env browser */
"use strict";



// Task 1-2.
// RegExp: Replace single quotes with double quotes in a large text.
$("#replaceQuotes").on("click", () => {
	const $text = $("#text");
	const $msg = $("#task12Msg");
	let text = $text[0].value.trim();
	
	$msg.html("");
	
	// Show error message, if no data entered.
	if (!text) {
		$msg.html("Invalid data entered.");
		return;
	}
	
	$text[0].value = text.replace(/^'|(\s)'/mg, "$1\"").replace(/'$|'(\s)/mg, "\"$1");
});


// Task 3.
// RegExp: Validate form input data.
$("#form").on("submit", () => {
	const errorFields = [];
	const $name = $("#name");
	const regexpName = /^[a-zа-яё]+$/i;
	const $phone = $("#phone");
	const regexpPhone = /^\+7 ?\(\d{3}\) ?\d{3}\-\d{4}$/;
	const $email = $("#email");
	const regexpEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
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
