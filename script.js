"use strict";

// TYPE DECLARATIONS

let sizeEnum = {
	small: "small",
	medium: "medium",
	large: "large"
};

// VARIABLE DECLARATIONS

// Change image variables

let size = "small";
let imageIndex = 2;
let mediaQuerySmall = window.matchMedia("only screen and (max-width: 640px)");
let mediaQueryMedium = window.matchMedia("only screen and (min-width:641px) and (max-width: 1080px)");
let mediaQueryLarge = window.matchMedia("only screen and (min-width: 1081px)");

// FUNCTION DECLARATIONS

// Change image functions

function initializeWebsite() {
	// Run the Callbacks once so that one of the background images will be the first to initialize
	matchMediaSmallCallback(mediaQuerySmall);
	matchMediaMediumCallback(mediaQueryMedium);
	matchMediaLargeCallback(mediaQueryLarge);

	// Add listener, so if the size of the document changes so that queries are disabled/enabled it will call the corresponding callback
	mediaQuerySmall.addListener(matchMediaSmallCallback);
	mediaQueryMedium.addListener(matchMediaMediumCallback);
	mediaQueryLarge.addListener(matchMediaLargeCallback);

	// Start carousel of switching images
	carousel();
	
	
	initSlides();
	initSlideshow();
	
}

function carousel() {
	imageIndex = (imageIndex % 2) + 1;
	loadImage();
	setTimeout(carousel, 15000);
}

function matchMediaSmallCallback(event) {
	// Will be called in event of that it matches and once after it matched when it does not match anymore
	// The event should be the mediaquery variable
	if (event.matches) {
		// console.log("Media query small matches");
		size = sizeEnum.small;
		loadImage();
	}
}

function matchMediaMediumCallback(event) {
	// Will be called in event of that it matches and once after it matched when it does not match anymore
	// The event should be the mediaquery variable
	if (event.matches) {
		// console.log("Media query medium matches");
		size = sizeEnum.medium;
		loadImage();
	}
}

function matchMediaLargeCallback(event) {
	// Will be called in event of that it matches and once after it matched when it does not match anymore
	// The event should be the mediaquery variable
	if (event.matches) {
		// console.log("Media query large matches");
		size = sizeEnum.large;
		loadImage();
	}
}

function loadImage() {
	let imagePrefix = "background";
	let imageSuffix = ".png";
	let imageFilename = imagePrefix + imageIndex + "-" + size + imageSuffix;
	let imagePath = "images/" + imageFilename;
	// console.log("Image path: " + imagePath);
	document.getElementById("banner-div").style.backgroundImage = "url(" + imagePath + ")";
}

// Scroll down functions

function scrollToMainContent() {
	const currentY = currentYPosition();
//	console.log(currentY)

	const elementY = elementYPosition("main-content-div");
//	console.log(elementY)

	smoothScroll("main-content-div");
}

function currentYPosition() {
	if (self.pageYOffset) {
		// Firefox, Chrome, Opera, Safari
		return self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) {
		// Internet Explorer 6 - standards mode
		return document.documentElement.scrollTop;
	} else if (document.body.scrollTop) {
		// Internet Explorer 6, 7 and 8
		return document.body.scrollTop;
	} else {
		return 0;
	}
}

function elementYPosition(elementID) {
	if (typeof elementID !== "string") {
		return;
	}

	const element = document.getElementById(elementID);
	if (element === null) {
		return;
	}

	let y = element.offsetTop;
	let node = element;

	while (node.offsetParent && node.offsetParent !== document.body) {
		node = node.offsetParent;
		y += node.offsetTop;
	}

	return y;
}

function smoothScroll(elementID) {
	if (typeof elementID !== "string") {
		return;
	}

	const startY = currentYPosition();
	const stopY = elementYPosition(elementID);
	const distance = stopY > startY ? stopY - startY : startY - stopY;

	if (distance < 100) {
		// Under 100 pixels, just jump to position
		scrollTo(0, stopY);

		return;
	}

	const speed = Math.max(20, Math.round(distance / 100));
	const step = Math.round(distance / 25);

	let leapY = stopY > startY ? startY + step : startY - step;
	let timer = 0;
	if (stopY > startY) {
		for (let i = startY; i < stopY; i += step) {
			setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
			leapY += step;

			if (leapY > stopY) {
				leapY = stopY;
			}

			timer += 1;
		}
	} else {
		for (let i = startY; i > stopY; i -= step) {
			setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
			leapY -= step;

			if (leapY < stopY) {
				leapY = stopY;
			}

			timer += 1;
		}
	}
}