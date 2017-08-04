// show bg images on hover

var arrayOfLinks = document.getElementsByClassName("work-links");

var showBgImage = function() {
	var hoveredImage = this.id.replace("proj-link-","proj-img-");
	document.getElementById(hoveredImage).className = "show-proj-img"
};

var hideBgImage = function() {
	var hoveredImage = this.id.replace("proj-link-","proj-img-");
	document.getElementById(hoveredImage).className = ""
};

for (i = 0; i < arrayOfLinks.length; i++) {
	arrayOfLinks[i].addEventListener("mouseover",showBgImage);
	arrayOfLinks[i].addEventListener("mouseout",hideBgImage);
};





