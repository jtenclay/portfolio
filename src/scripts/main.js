import '../styles/main.scss';

var arrayOfLinks = document.querySelectorAll(".work-links");

arrayOfLinks.forEach((el) => {
	// attach mouseover and mouseout listeners
});

// keep background illustration a square

const $backgroundIllustrationWrapper = document.querySelector('.background-illustration__inner-wrapper'),
			$backgroundIllustration = document.querySelector('.background-illustration');

function resizeBackgroundIllustration() {
	let size = Math.min($backgroundIllustrationWrapper.clientHeight, $backgroundIllustrationWrapper.clientWidth);
	$backgroundIllustration.style.width = $backgroundIllustration.style.height = size + 'px';
}
resizeBackgroundIllustration();


// resize handler

window.addEventListener("resize", resizeThrottler, false);
var resizeTimeout;
function resizeThrottler() {
  if ( !resizeTimeout ) {
    resizeTimeout = setTimeout(function() {
      resizeTimeout = null;
      // here they go!
      resizeBackgroundIllustration();
    }, 66);
  }
}
