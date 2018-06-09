import '../styles/main.scss';
// import * as backgrounds from './backgrounds';

// backgrounds.defaultInit();

// var linksArr = document.querySelectorAll("a");

// linksArr.forEach((el) => {
// 	if (el.getAttribute('data-background')) {
// 		el.addEventListener('mouseover', (e) => {
// 			backgrounds[el.getAttribute('data-background') + 'Init']();
// 		});
// 		el.addEventListener('mouseout', (e) => {
// 			backgrounds[el.getAttribute('data-background') + 'Destroy']();
// 		});
// 	}
// });

// // keep background illustration a square

// const $backgroundIllustrationWrapper = document.querySelector('.background-illustration__wrapper'),
// 			$backgroundIllustration = document.querySelector('.background-illustration');

// function resizeBackgroundIllustration() {
// 	let wrapperWidth = $backgroundIllustrationWrapper.clientWidth * 0.8 - 120,
// 			size = Math.min(450, $backgroundIllustrationWrapper.clientHeight, wrapperWidth);
// 	$backgroundIllustration.style.width = $backgroundIllustration.style.height = size + 'px';
// }
// resizeBackgroundIllustration();


// // resize handler

// window.addEventListener("resize", resizeThrottler, false);
// var resizeTimeout;
// function resizeThrottler() {
//   if ( !resizeTimeout ) {
//     resizeTimeout = setTimeout(function() {
//       resizeTimeout = null;
//       // here they go!
//       resizeBackgroundIllustration();
//     }, 66);
//   }
// }
