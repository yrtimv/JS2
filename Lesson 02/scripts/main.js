/* eslint-env browser */
"use strict";



/**
 * -= Task 1-2 =-
 * Create AJAX menu for internet-shop.
 */
$("#createMenu").on("click", () => {
	let xhr;
	
	if (window.XMLHttpRequest) {
		// XHR object for Chrome, Mozilla, Opera, Safari.
		xhr = new XMLHttpRequest();
		xhr.overrideMimeType("text/xml");
	} else {
		// XHR object for Internet Explorer.
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	// Timeout setup.
	xhr.timeout = 5000; // 5 seconds timeout for response not received.
	xhr.ontimeout = () => {
		$(".errorMsgWrapper").css("display", "inline-block");
	};
	
	xhr.onreadystatechange = () => {
		// Handle only finished response state.
		if (xhr.readyState !== xhr.DONE) {
			return;
		}
		
		if (xhr.status) {
			// Show error, if response is not ok.
			if (xhr.status !== 200) {
				$(".errorMsgTitle").html("Error " + xhr.status);
				$(".errorMsgText").html(xhr.statusText);
				
				return;
			}
			
			// Hide create menu button.
			$("#createMenu").hide();
			
			// Server successfully responded with the menu data.
			const menuArr = JSON.parse(xhr.responseText);
			let $menuList, $submenuItem;
			
			// Create main menu.
			$menuList = $(".mainMenu");
			
			// Create main menu items.
			for (const menuItem of menuArr.mainMenu) {
				$("<li>").appendTo($menuList)
					.append($("<a>", { href: menuItem.href, html: menuItem.name }));
			}
			
			// Create catalog menu.
			$menuList = $(".catalogMenu");
			
			// Create catalog menu items.
			for (const catMenu of menuArr.catalog) {
				$submenuItem = $("<ul>")
					.appendTo($("<li>").appendTo($menuList)
						.append($("<a>", { href: catMenu.href, html: catMenu.name }))
					);
				
				for (const item of catMenu.items) {
					$("<li>").appendTo($submenuItem)
						.append($("<a>", {
								class: "menuItem",
								href: item.href,
								html: item.name
							}));
				}
			}
		}
	};
	
	// Send async server request for catalog data.
	xhr.open("GET", "scripts/menu.json", true);
	xhr.send(null);
});



/**
 * -= Task 3 =-
 * Display thumbs and original images with AJAX.
 */
function showTask(element, tab) {
	// Activate the button and show selected task output tab.
	element = $(element);
	
	if (element.hasClass("buttonActive")) {
		return;
	}
	
	$(".button").removeClass("buttonActive");
	element.addClass("buttonActive");
	$(".output:visible").hide();
	$(".output" + tab).show();
}

function init() {
	// Original image loading error handler.
	$(".originalImage").on("error", function () {
		$(".originalImage").hide();
		$(".originalNA").show();
	});
	
	// Create a list of thumb images.
	const $thumbnails = $(".thumbnails");
	let xhr;
	
	if (window.XMLHttpRequest) {
		// XHR object for Chrome, Mozilla, Opera, Safari.
		xhr = new XMLHttpRequest();
		xhr.overrideMimeType("text/xml");
	} else {
		// XHR object for Internet Explorer.
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	// Timeout setup.
	xhr.timeout = 5000; // 5 seconds timeout for response not received.
	xhr.ontimeout = () => {
		$(".errorMsgWrapper").css("display", "inline-block");
	};
	
	xhr.onreadystatechange = () => {
		// Handle only finished response state.
		if (xhr.readyState !== xhr.DONE) {
			return;
		}
		
		if (xhr.status) {
			// Show error, if response is not ok.
			if (xhr.status !== 200) {
				$(".errorMsgTitle").html("Error " + xhr.status);
				$(".errorMsgText").html(xhr.statusText);
				
				return;
			}
			
			const images = JSON.parse(xhr.responseText);
	
			// Create thumbnail image elements.
			for (const img of images) {
				$("<img>", {
					src: "images/thumbs/" + img.src,
					alt: img.name
				}).appendTo($thumbnails);
			}
			
			// Configure thumbnail JS plugin.
			$thumbnails.slick({
				infinite: false,
				dots: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				arrows: false
			});

			// Set props for thumbnail images.
			const $slide = $(".slick-slide");

			$slide.prop("title", function () { return this.alt; });
			$slide.on("click", function () { showOriginal(this); });

			// Show first image in the gallery.
			$("[data-slick-index = 0]").click();
		}
	};
	
	// Send async server request for catalog data.
	xhr.open("GET", "scripts/images.json", true);
	xhr.send(null);
	
	$(".buttonGallery").click();
}

function prevSlide() {
	// Get current slide index and show the previous one, if it's not the first.
	let slideIndex = parseInt($(".originalImage").data("slideIndex"));
	
	if (Number.isNaN(slideIndex)) {
		slideIndex = 0;
	}
	
	if (slideIndex > 0) {
		$("[data-slick-index = " + (slideIndex - 1) + "]").click();
	}
}

function nextSlide() {
	// Get current slide index and show the next one, if it's not the last.
	let slideIndex = parseInt($(".originalImage").data("slideIndex"));
	
	if (Number.isNaN(slideIndex)) {
		slideIndex = 0;
	}
	
	if (slideIndex < $(".slick-track")[0].childElementCount - 1) {
		$("[data-slick-index = " + (slideIndex + 1) + "]").click();
	}
}

function showOriginal(slide) {
	// Get current slide index.
	const $originalImage = $(".originalImage");
	let slideIndex = parseInt(slide.dataset.slickIndex);
	
	if (Number.isNaN(slideIndex)) {
		slideIndex = 0;
	}
	
	// Hide unavailable original image block.
	$(".originalNA:visible").hide();
	
	// Set up properties and show the original image.
	$originalImage.prop("src", slide.src.toString().replace(/\/thumbs\//i, "/original/"));
	$originalImage.prop("alt", slide.alt);
	$originalImage.data("slideIndex", slideIndex);
	$originalImage.show();
	
	// Set current image header.
	$(".caption").html(slide.alt);
	
	// Set navigation buttons visibility.
	if (slideIndex === 0) {
		$(".fa-chevron-circle-left").addClass("invisible");
	} else {
		$(".fa-chevron-circle-left").removeClass("invisible");
	}

	if (slideIndex === $(".slick-track")[0].childElementCount - 1) {
		$(".fa-chevron-circle-right").addClass("invisible");
	} else {
		$(".fa-chevron-circle-right").removeClass("invisible");
	}
}



/**
 * -= Task 4 =-
 * Test server responses on success/error.
 */
$("#testRequest").on("click", () => {
	let xhr;
	
	if (window.XMLHttpRequest) {
		// XHR object for Chrome, Mozilla, Opera, Safari.
		xhr = new XMLHttpRequest();
		xhr.overrideMimeType("text/xml");
	} else {
		// XHR object for Internet Explorer.
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.onreadystatechange = () => {
		// Handle only finished response state.
		if (xhr.readyState !== xhr.DONE) {
			return;
		}
		
		if (xhr.status) {
			const $testMsgTitle = $(".testMsgTitle");
			const $testMsgText = $(".testMsgText");
			
			// Show error, if response is not ok.
			if (xhr.status !== 200) {
				$testMsgTitle.html("Error " + xhr.status);
				$testMsgText.html(xhr.statusText);
				
				return;
			}
			
			// Server successfully responded with the menu data.
			const responseResult = JSON.parse(xhr.responseText);
			
			// Style text title depending on the response title.
			if (responseResult.title === "Success!") {
				$testMsgTitle.removeClass("errorMsgTitle");
				$testMsgTitle.addClass("successMsgTitle");
			} else {
				$testMsgTitle.removeClass("successMsgTitle");
				$testMsgTitle.addClass("errorMsgTitle");
			}
			
			// Display response title and text.
			$testMsgTitle.html(responseResult.title);
			$testMsgText.html(responseResult.text);
		}
	};
	
	// Send async server request for catalog data.
	const fileNames = ["success", "error"];
	const randomResponse = Math.floor(Math.random() * 2);
	
	xhr.open("GET", "scripts/response_" + fileNames[randomResponse] + ".json", true);
	xhr.send(null);
});
