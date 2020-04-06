
window.onload = function() {
	document.getElementsByClassName("mobilemenutrigger")[0].addEventListener("click", mobileMenuFunc);
	document.getElementsByClassName("exit")[0].addEventListener("click", closeFunc);
	document.getElementById("mobilemenu").addEventListener("click", closeFunc);
	document.getElementById("hero").className = "fadeinClass";

	var links = document.querySelectorAll("nav a");

	for(let i = 0; i < links.length; i++){
		links[i].addEventListener("click", function(event){
				jsScroll(event);
	});
	}
}

function mobileMenuFunc() {
	var mobile = document.getElementById("mobilemenucontainer");
	mobile.style.display = "flex";
	mobile.className = "fadeinClass";
	document.body.style.overflow = "hidden";
}

function closeFunc() {
	var mobile = document.getElementById("mobilemenucontainer");
	mobile.style.display = "none";
	document.body.style.overflow = "visible";
}

window.onscroll = function(){
	var proficiencies = document.getElementById("proficiencies");	
	var work = document.getElementById("workhistory");
	var projects = document.getElementById("projects");
	
	var buffer = 250;
	
	if(window.innerWidth <= 768)
		buffer = -350;
	
	if(window.pageYOffset >= education.offsetTop + buffer)
		education.className = "fadeRightClass";
	
	if(window.pageYOffset >= proficiencies.offsetTop + buffer)
		proficiencies.className = "fadeLeftClass";
	
	if(window.pageYOffset >= work.offsetTop + buffer)
		work.className = "fadeRightClass";
	
	if(window.pageYOffset >= projects.offsetTop + buffer)
		projects.className = "fadeLeftClass";
};

function jsScroll(event){
	var which = this.event.target.getAttribute('href');
	
	if(which != 'index.html')
		this.event.preventDefault();
	
	var header = document.querySelector("header");
	var hero = document.getElementById("hero");
	var what = document.querySelector(which);
	
	var howMuch = what.offsetTop + hero.offsetHeight;
	
	if(window.innerWidth <= 768)
		howMuch = what.offsetTop;
	
	window.scrollTo({
		  top: howMuch,
		  left: 0,
		  behavior: 'smooth'
		});
	
}