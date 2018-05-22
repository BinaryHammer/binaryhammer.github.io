"use strict";

function scrollToMainContent() {
	const currentY = currentYPosition()
//	console.log(currentY)

	const elementY = elementYPosition("main-content-div")
//	console.log(elementY)

	smoothScroll("main-content-div")
}

function currentYPosition() {
	if (self.pageYOffset) {
		// Firefox, Chrome, Opera, Safari
		return self.pageYOffset
	} else if (document.documentElement && document.documentElement.scrollTop) {
		// Internet Explorer 6 - standards mode
		return document.documentElement.scrollTop
	} else if (document.body.scrollTop) {
		// Internet Explorer 6, 7 and 8
		return document.body.scrollTop
	} else {
		return 0
	}
}

function elementYPosition(elementID) {
	if (typeof elementID !== "string") {
		return
	}
	
	const element = document.getElementById(elementID)
	if (element === null) {
		return
	}

	let y = element.offsetTop
	let node = element

	while (node.offsetParent && node.offsetParent !== document.body) {
		node = node.offsetParent
		y += node.offsetTop
	}

	return y
}

function smoothScroll(elementID) {
	if (typeof elementID !== "string") {
		return
	}
	
	const startY = currentYPosition()
	const stopY = elementYPosition(elementID)
	const distance = stopY > startY ? stopY - startY : startY - stopY

	if (distance < 100) {
		// Under 100 pixels, just jump to position
		scrollTo(0, stopY)

		return
	}

	const speed = Math.max(20, Math.round(distance / 100))
	const step = Math.round(distance / 25);

	let leapY = stopY > startY ? startY + step : startY - step
	let timer = 0
	if (stopY > startY) {
		for (let i = startY; i < stopY; i += step) {
			setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed)
			leapY += step

			if (leapY > stopY) {
				leapY = stopY
			}
			
			timer += 1
		}
	} else {
		for (let i = startY; i > stopY; i -= step) {
			setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed)
			leapY -= step

			if (leapY < stopY) {
				leapY = stopY
			}

			timer += 1
		}
	}
}
