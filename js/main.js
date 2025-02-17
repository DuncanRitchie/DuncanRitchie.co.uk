if (window.IntersectionObserver) {
	document.querySelector("body").classList.remove("no-intersection-observer");
	document.querySelector("body").classList.add("has-intersection-observer");
}

//// Headings have {position: absolute} on rectangular & diagonal layout.
//// This is necessary so that they are superimposed on the main images.
//// However, it means that text following the heading will sit behind
//// the heading, rather than under it.
//// To fix this, we set the margin-top of the element immediately
//// after the heading to be equal to the height of the heading.
//// This includes the heading’s margin-top, margin-bottom, and border-top
//// (border-bottom is not used on any heading).
//// The margin-top is also defined in the CSS, with breakpoints for
//// where more margin is needed because the heading is wrapping onto
//// a second line. If the margin-top were not defined in the CSS,
//// and the user tried to navigate between (eg) code.html#velut and
//// aboutme.html#latin, the navigation would happen before the margin
//// was added, so could be wrong by several dozen pixels up or down.
//// Having this JavaScript makes the margin-top more accurate,
//// especially at the breakpoints where the headings wrap onto two lines.
const setMarginAfterAbsolutelyPositionedHeadings = () => {
	const elementsToAddMarginTo = document.querySelectorAll("article h2 + *");
	if (document.documentElement.clientWidth > 674) {
		const fullWidthElements = document.querySelectorAll("section article h2");

		for (let i = 0; i < fullWidthElements.length; i++) {
			const borderTopWidthAsText = getComputedStyle(fullWidthElements[i]).borderTopWidth //// Eg, "52.8px"
			const borderTopWidth = +borderTopWidthAsText.substring(0, borderTopWidthAsText.length - 2); //// Remove the "px" and convert to number

			const marginTopAsText = getComputedStyle(fullWidthElements[i]).marginTop //// Likewise for the margin-top
			const marginTop = +marginTopAsText.substring(0, marginTopAsText.length - 2);

			const marginBottomAsText = getComputedStyle(fullWidthElements[i]).marginBottom //// Likewise for the margin-bottom
			const marginBottom = +marginBottomAsText.substring(0, marginBottomAsText.length - 2);

			const isShowcaseHeading = fullWidthElements[i].closest('.showcase-group') ? true : false //// More margin is needed in the showcases.

			const marginNeeded = fullWidthElements[i].offsetHeight + marginTop + marginBottom + borderTopWidth - (isShowcaseHeading ? 0 : 72);

			elementsToAddMarginTo[i].style.marginTop = `${marginNeeded}px`;
		}
	}
	else {
		for (let i = 0; i < elementsToAddMarginTo.length; i++) {
			elementsToAddMarginTo[i].style.marginTop = `0px`;
		}
	}
}

setMarginAfterAbsolutelyPositionedHeadings();

window.addEventListener("load", () => setTimeout(setMarginAfterAbsolutelyPositionedHeadings, 100));
window.addEventListener("resize", setMarginAfterAbsolutelyPositionedHeadings);
