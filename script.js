"use strict";

// VARIABLE DECLARATIONS

// Carousel variables

const imageDisplayTime = 10000
let imagesLoadedCount = 0
let currentIndex = 0
let imgElements = undefined
let oldImgElem = undefined
let newImgElem = undefined
let carousel = undefined

// FUNCTION DECLARATIONS

function initializeWebsite() {
	// Init images
	// Set attribute with index on each image to access them easier
	const carouselDiv = document.getElementById("carousel-div")
	imgElements = carouselDiv.children
	
	// Init carousel
	setNewImage()
	
	// Add callback for every image when it is loaded
	imgElements[0].classList.add("fade-in")
	for (const imgElem of imgElements) {
		imgElem.onload = callbackImageLoaded()
	}
}

// Carousel functions

function callbackImageLoaded() {
	imagesLoadedCount = imagesLoadedCount + 1
	
	// If all images are loaded, start carousel
	if (imagesLoadedCount == imgElements.length) {
		carousel = window.setInterval(() => { performTransition() }, imageDisplayTime)
	}
}

function performTransition() {
	// For first load the first image has fadeing in effect, remove it
	newImgElem.classList.remove("fade-in")
	
	// Unset old image
	if (oldImgElem !== undefined) {
		oldImgElem.classList.remove("old")
		oldImgElem.classList.remove("fade-out")
	}
	
	// "new" image will be set to be the "old" image
	newImgElem.classList.remove("new")
	oldImgElem = newImgElem
	newImgElem = undefined
	oldImgElem.classList.add("old")
	
	// Index is updated
	currentIndex++;
	if (currentIndex >= imgElements.length) {
		currentIndex = 0 // Begin from the start
	}
	
	setNewImage()
	
	// Fade out old image, which sits on top of the new image
	oldImgElem.classList.add("fade-out")
}

function setNewImage() {
	newImgElem = imgElements[currentIndex]
	newImgElem.classList.add("new")
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