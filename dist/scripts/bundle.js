!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="dist",e(e.s=0)}([function(t,e,n){"use strict";function r(){var t=Math.min(c.clientHeight,c.clientWidth);l.style.width=l.style.height=t+"px"}function o(){a||(a=setTimeout(function(){a=null,r()},66))}n(1);var u=n(4),i=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(u);document.querySelectorAll("a").forEach(function(t){t.getAttribute("data-background")&&(t.addEventListener("mouseover",function(e){i[t.getAttribute("data-background")+"Init"]()}),t.addEventListener("mouseout",function(e){i[t.getAttribute("data-background")+"Destroy"]()}))});var c=document.querySelector(".background-illustration__inner-wrapper"),l=document.querySelector(".background-illustration");r(),window.addEventListener("resize",o,!1);var a},function(t,e){},,,function(t,e,n){"use strict";function r(){console.log("multiple init")}function o(){console.log("multiple destroyed")}Object.defineProperty(e,"__esModule",{value:!0}),e.multipleInit=r,e.multipleDestroy=o}]);