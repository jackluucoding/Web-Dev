window.onload = function () {
    $("#user").addEventListener("click", profile);
    $("#calendarcontainerheader").addEventListener("click", expandCalendarList);
    $("#create").addEventListener("click", createEventMenu);
    $("#logout").addEventListener("click", logout);
    $("#createEventForm").addEventListener("submit", function(event){
    	event.preventDefault();
    	createNewEvent();
    });
    $("button.googlebutton").addEventListener("click", importFromGoogle);
    $(".reset").addEventListener("click", function(){
    	this.closest("form").reset();
    });
	let fb = $("form button");
	fb.addEventListener("mouseover", function (e) {
		e.currentTarget.lastElementChild.style.opacity = "1";
	});
	fb.addEventListener("mouseout", function (e) {
		e.currentTarget.lastElementChild.style.opacity = "0";
	});

	$("#file").addEventListener("change", function(){
		uploadPicture();
	});
	
	retrievePicture();
	weirdFlex();
    getEvents();
    exchangeCode();
};

var categoryArray = [];

function getEvents(){
	ajax({
		method: "GET",
		url: "/events",
		success: createEventDiv,
		complete: function(){
			expandEvent();
			getCategories(createCategoryList);
		}
	});
}

function createNewEvent(){
	let data = mapFormData($("#createEventForm"));
	ajax({
		method: "POST",
		url: "/create",
		data: data,
		success: function(r){
			var arr = [];
			arr.push(r);
			createEventDiv(arr);
			document.querySelector("#createevent").style.display = "none";
			toaster("Event '"+r.title+"' created successfully!");
		},
		complete: function(){
			getCategories(createCategoryList);
			colorGenerator();
			document.querySelector("#createEventForm").reset();
		}
	});
}

//only to be used when I get the date thing sorted out
const populateDateCircles = () =>{
	var dayColumn = document.querySelectorAll(".gridheader");
	var time = new Date();
	for(let j = 0; j < dayColumn.length; j++) {
		dayColumn[j].firstElementChild.innerHTML = (time.getDate() + j);
	}
};

function createEventDiv(events){
	var dayColumn = document.querySelectorAll(".gridheader");
	var hours = document.getElementsByClassName("hour");
	var col = document.getElementsByClassName("col");
	var hr = document.querySelectorAll(".colwrapper hr");
	var time = new Date();
	
	// repeat for the amount of events
	for(var i = 0; i < events.length; i++){
		categoryArray.push(events[i].category);
		// going through the day columns
		for(var j = 0; j < dayColumn.length; j++){
    		if(events[i].startTime.includes(dayColumn[j].lastChild.innerHTML)){
    			var div = document.createElement("div");
    			div.className = "event";
    			div.innerHTML = 
    			'<div><h2>'+events[i].title+'</h2><div class="circle" data-cat="'+events[i].category+'"></div></div>'+
    			'<div><h3>Time: </h3><p>'+events[i].startTime+' until '+events[i].endTime+'</p></div>'+
    			'<div><h3>Category: </h3><p>'+events[i].category+'</p></div>';
				if(events[i].location)
					div.innerHTML += '<div><h3>Location: </h3><p>'+events[i].location+"</p></div>";
				if(events[i].description)
					div.innerHTML += '<div><h3>Description: </h3><p>'+events[i].description+"</p></div>"
					
					let actiondiv = document.createElement("div");
					actiondiv.classList.add("eventactions");
					let i1 = document.createElement("i");
					let i2 = document.createElement("i");
					i1.classList.add("material-icons");
					i2.classList.add("material-icons");
					i1.innerHTML = "create";
					addEventActionListeners(i1);
					i2.innerHTML = "delete_forever";
					addEventActionListeners(i2);
					i2.setAttribute("data-eventid", events[i].eventId);
				/*div.innerHTML += '<div class="eventactions">'+
					'<i class="material-icons icon-marg-right">create</i>'+
					'<i class="material-icons" data-eventId="'+events[i].eventId+'">delete_forever</i>'+
				'</div>';*/
				actiondiv.appendChild(i1);
				actiondiv.appendChild(i2);
				div.appendChild(actiondiv);
				
			// looking for the start/end time
				for(var k = 0; k < hours.length; k++){
					if(events[i].startTime.substring(events[i].startTime.indexOf(' ')+1) == hours[k].innerHTML
							&& k != hours.length-1){
							div.style.top = hr[k].offsetTop + "px";	
							div.style.zIndex = k+1;
						var start = hr[k];
					}
					// looking for the end time
					if(events[i].endTime == (hours[k].innerHTML))
				        div.style.height = (hr[k].offsetTop - start.offsetTop) + "px";
					 else if(events[i].endTime == "12am")
			        	div.style.height = hr[24].offsetTop - start.offsetTop + "px";
					
				}
				col[j].appendChild(div);
    		}
		}
	}
}

function expandEvent(){
	var events = document.getElementsByClassName("event");
	for(var i = 0; i < events.length; i++){
			if((events[i].lastElementChild.offsetHeight + events[i].lastElementChild.offsetTop) < events[i].offsetHeight){
				events[i].classList.toggle("corner");
				events[i].firstElementChild.lastElementChild.classList.toggle("display");
			}else{		
				events[i].style.cursor = "pointer";
				events[i].addEventListener("click", function(e){
					if(e.target.tagName != "I"){
						this.classList.toggle("height-auto");
						this.firstElementChild.lastElementChild.classList.toggle("display");
						this.classList.toggle("corner");
						analyzePosition(this);
					}
				 });
			}
		
	}
}

function analyzePosition(event){
	let view = event.closest(".col").offsetHeight;
	
	if(event.offsetHeight + event.offsetTop > view){
		event.setAttribute("data-top", event.offsetTop+"px")
		event.style.top = view - event.offsetHeight + "px";
	}else if(event.getAttribute("data-top")){
		event.style.top = event.getAttribute("data-top");
	}
}

function logout(){
	ajax({
		method: "POST",
		url: "/logout",
		success: function(){
			window.location.replace("/");
		}
	});
}

function weirdFlex(){
	var cont = document.getElementsByClassName("colwrapper");
	
	for(var i = 0; i <= 24; i++){
		var hr = document.createElement("hr");
		hr.style.top = (((document.getElementsByClassName("col")[0].clientHeight) / 24) * i )+ "px";	
		cont[0].appendChild(hr);	
	}
}

const profile = () => {
    var wrapper = document.getElementById("profile");
    wrapper.style.display = "block";
    wrapper.className = "height-animation";
    clickout(wrapper, true);  
};

const clickout = (closethis, hasAnimation) =>{
	if(hasAnimation)
		setTimeout(function(){closethis.classList.toggle("ontop");}, 300);
	else
		closethis.classList.toggle("ontop");
	
	let d = $("#clickoff");
	d.className = "clickoff";
	d.addEventListener("click", function(e){
			closethis.style.display = "none";
			d.className = "";
	});
};

function expandCalendarList(event){
	event.target.closest("#calendarcontainerheader").lastElementChild.classList.toggle("rotate-180");
    let list = document.getElementById("calendarlist");
    list.classList.toggle("display");
	}

function createEventMenu(){
	let menu = $("#createevent");
	menu.style.display = "block";
	clickout(menu, false);
	menu.children[0].reset();
}

function getCategories(callback){
	 ajax({
		method: "GET",
		url: "/categories",
		complete: function(response){
			callback([...new Set(response)]);
		}
	 });
}

const createCategoryList = (arr) =>{
	let par = $("#calendarlist ul");
	if(par)
		while(par.lastChild){
			par.removeChild(par.lastChild);
		}
	for(let x of arr){
		let li = document.createElement("li");
		let div = document.createElement("div");
		div.className = "circle";
		div.setAttribute("data-cat", x);
		li.append(div);
		li.innerHTML += x;
		li.addEventListener("click", toggleEventsByCategory);
		par.append(li);
	}

	colorGenerator();
};

function colorGenerator(){
	var circles = document.querySelectorAll(".circle");
	var colorArray = ['#FF6633', '#FFB399', '#FF33FF','#CC9999', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#6666FF', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#FFFF99'];
	var catObj = [];
	
	for(var i = 0; i < categoryArray.length; i++){
		var obj = {category:categoryArray[i], color:colorArray[i]};
		catObj.push(obj)
	}
	
	for(var i = catObj.length-1; i >= 0; i--){
		for(var j = circles.length-1; j >= 0; j--){
			if(circles[j].getAttribute('data-cat') == catObj[i].category){
				circles[j].style.backgroundColor = catObj[i].color;
				let near = circles[j].closest(".event");
				if(near != null)
					near.style.border = "2px solid " + catObj[i].color;
			}
		}
	}
}

function toggleEventsByCategory(event){
	var category;
	var events = document.querySelectorAll(".event");
	var circle;
	if(event.target.tagName == "DIV"){
		category = event.target.getAttribute("data-cat");
		circle = event.target;
	}
	else{
		category = event.target.firstElementChild.getAttribute("data-cat");
		circle = event.target.firstElementChild;
	}
		
	for(var i = 0; i < events.length; i++){
		if(events[i].firstElementChild.lastElementChild.getAttribute("data-cat") == category){
			events[i].classList.toggle("display-toggle");
		}
	}
	
	circle.classList.toggle("closedCircle");
	
	
}

const importFromGoogle = () =>{
	ajax({
		method: "GET",
		url: "/auth",
		success: function(r){
			window.location.replace(r);
		}
	});
};

const exchangeCode = () =>{
	if(window.location.href.includes("?code=")){
		const url = new URL(window.location.href);
		const c = url.search;
		const code = c.substring(c.indexOf('=')+1)

		ajax({
			url: "/importGoogleEvents",
			method: "POST",
			data: {codeInc:code},
			success: function(response){
				let events = response;
				let length = events["items"].length;
				console.log(events);
				console.log(events["items"]);
				toaster(length + (length>1 || length==0 ? " events" : " event") + " successfully imported from Google!");
			}
		});
	}
};

const toaster = (message) => {
	let div = document.createElement("div");
	div.className = "toaster googlestyle";
	div.innerHTML = message;
	document.body.appendChild(div);
	let ani = "toastout .3s ease-out 0s normal 1 forwards";

	let t = setTimeout(function(){
		div.style.animation = ani;
		setTimeout(function(){
			document.body.removeChild(div);
		},300);
		}, 3000);

	div.addEventListener("click", function(){
		clearTimeout(t);
		div.style.animation = ani;
		setTimeout(function(){
			document.body.removeChild(div);
		},300);
	});

};

const deleteEvent = (id) => {
	let ev = id.target.closest(".event");
	let eid = id.target.getAttribute("data-eventid");

	ajax({
		url: "/deleteEvent",
		method: "PUT",
		data: {eventId : eid},
		success: function(){
			toaster("Successfully deleted "+ev.firstElementChild.firstElementChild.innerHTML);
			ev.parentElement.removeChild(ev);
			getCategories(createCategoryList);
			colorGenerator();
		}		
	});
};

const addEventActionListeners = (icons) =>{
	let type = icons.innerHTML;
	switch(type){
		case "create":
		
		break;
		case "delete_forever":
			icons.addEventListener("click", deleteEvent);
		break;
		default: break;
	}
};

const uploadPicture = () => {
	let formdata = new FormData();
	let file = $("#file").files[0];
	formdata.append("file", file);

	ajax({
		url: "/uploadPicture",
		method: "POST",
		isFile: true,
		data: formdata,
		success: function(){
			retrievePicture();
			toaster("Successfully uploaded " + file.name);
			document.querySelector("#clickoff").click();
		}
	});
};

const retrievePicture = () =>{
	ajax({
		method: "GET",
		url: "/downloadPicture",
		responseType: "blob",
		success: function(data){
			let i = document.querySelector("#user");
			while(i.childElementCount >= 2){
				i.removeChild(i.lastChild);
			}
			var img = document.createElement('img');
			var url = window.URL;
			img.src = url.createObjectURL(data);
			document.querySelector("#user").appendChild(img);
		},
		error: function(){
			let i = document.createElement("i");
			i.className = "material-icons";
			i.innerHTML = "apps";
			document.querySelector("#user").appendChild(i);
		}
	});
};