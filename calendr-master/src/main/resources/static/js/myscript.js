(function () {
    $("#signup").addEventListener("click", signupForm);
    $("#back").addEventListener("click",goBack);
    let newpass = $("#newpassword");
    newpass.addEventListener("focus", passwordFocus);
    newpass.addEventListener("blur",passwordBlur);
    newpass.addEventListener("keyup", password2Focus);
    $("#telephone").addEventListener("keyup", function(){
        numbersOnly(this);
    });
    let newpass2 = $("#newpassword2");
    newpass2.addEventListener("focus", password2Focus);
    newpass2.addEventListener("keyup", password2Focus);
    $("#name").addEventListener("keyup", function () {
        lettersOnly(this)
    });

    for(let i of $("form button")) {
        i.addEventListener("mouseover", function (e) {
            e.currentTarget.lastElementChild.style.opacity = "1";
        });
        i.addEventListener("mouseout", function (e) {
            e.currentTarget.lastElementChild.style.opacity = "0";
        });
    }
    
    $("#loginform").addEventListener("submit", function(e){
        let d = sanitize(e);
    	login(d);
    });
    
    $("#signupform").addEventListener("submit", function(e){
        let d = sanitize(e);
    	register(d);
    });
})();

function signupForm() {
    $("#loginform").style.display = "none";
    $("#signupform").style.display = "block";
}

function goBack() {
    $("#signupform").style.display = "none";
    $("#loginform").style.display = "block";
    }

function passwordFocus() {
    var p = document.createElement("div");
    p.innerHTML = "<p>Must be 8 characters long.</p><p>Must have one upper and lower case.</p>" +
    		"<p>Must have one number.</p><p>Must have one special character.</p><br>";
    p.setAttribute("id", "pwRules");
    p.style.color = "red";
    var x = $("label")[3];
    x.before(p);

    document.getElementById("newpassword").addEventListener("input", pwValidation);

    //keeps pwrules green when you blur and then re-focus
    document.getElementById("newpassword").addEventListener("focus", pwValidation);
}

function passwordBlur() {
    $("#pwRules").remove();
}

function pwValidation(event) {
    var cases = new RegExp("(?=.*[a-zA-Z])(?=.*[a-z])");
    var numbers = new RegExp("(?=.*[0-9])");
    var chars = new RegExp("(?=.*[\\W])");
    var p = document.getElementById("pwRules");
    var ev = event.target.value;
    
    
    if (ev.length >= 8)
        p.children[0].style.color = "green";
    else
        p.children[0].style.color = "red";

    if (ev.match(cases))
        p.children[1].style.color = "green";
    else
        p.children[1].style.color = "red";

    if (ev.match(numbers))
        p.children[2].style.color = "green";
    else
        p.children[2].style.color = "red";

    if (ev.match(chars))
        p.children[3].style.color = "green";
    else
        p.children[3].style.color = "red";
}

function teleValidation(event) {
    var numbers = new RegExp(/^(\d{10})$/g);
    var p = document.getElementById("teleRules");

    if(numbers.test(event.target.value)){
        p.children[0].style.color = "green";
        event.target.validity = true;
    }else{
        p.children[0].style.color = "red";
        event.target.validity = false;
    }
}

function lettersOnly(input) {
    var regex = /[0-9]/gi;
    input.value = input.value.replace(regex, "")
}

function numbersOnly(input) {
    var regex = /[^0-9]/gi;
    input.value = input.value.replace(regex, "")
}

function password2Focus() {
    var x = document.getElementById("newpassword2");
    var y = document.getElementById("newpassword");
    var pass1 = $("#newpassword").value;
    var pass2 = $("#newpassword2").value;

    if (pass1 != pass2) {
        x.style.border = "1px solid red";
        x.removeEventListener("blur", password2Blur);
    } else {
        x.style.border = "1px solid green";
        x.validity = true;
        y.validity = true;
        x.addEventListener("blur", password2Blur);
    }
}

function password2Blur() {
    var x = document.getElementById("newpassword2");
    x.style.border = "none";
}

const sanitize = (event) => {
	event.preventDefault();
	const form = event.target;
	let values = [];
	let regex;
	let formData = {};
	
	for(let i = 0; i < form.childElementCount; i++){
		if(form.children[i].value && form.children[i].getAttribute("name") !== "repeat"){

			values.push({
				'type' : form.children[i].tagName.toLowerCase(),
				'name' : form.children[i].getAttribute("name").toLowerCase(),
				'value': form.children[i].value,
				'safe' : false
				}
			);
		}
	}
	
	values.forEach((obj) => {		
		switch(obj.name){
		case 'username':
			/*
			 * has to start with a letter or number, must contain letters, no caps
			 * must be 6-15 chars long, _ and - allowed.
			 */
			regex = new RegExp(/^[a-z0-9{1}]((?=.*\w)[a-z0-9\_\-]{5,14})$/g);
			obj.safe = regex.test(obj.value);
			break;
		case 'password':
			/*
			 *between 8 and 20 chars long, must have number, must have upper/lower case
			 *must also contain any non word character 
			 */
			regex = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})/g);
			obj.safe = regex.test(obj.value);
			break;
		case 'name':
			/*
			 * only letters, each name must be 2+ letters long, must contain only
			 * one space in-between
			 */
			regex = new RegExp(/^([a-zA-Z]{2,12})([\s]{1})([a-zA-Z]{2,12})$/g);
			obj.safe = regex.test(obj.value);
			break;
		case 'email':
			/*
			 * must start with letter or number, only letters, numbers, and periods allowed
			 * length not specified, needs a period after the @ sign, no numbers in the TLD
			 * 
			 */
			regex = new RegExp(/^[a-z0-9{1}]+(?:[a-z0-9.]+)*@(?:[a-z0-9{1}](?:[a-z0-9-]+)?\.)+[a-z](?:[a-z0-9-]*[a-z])?$/gi);
			obj.safe = regex.test(obj.value);
			break;
		case 'telephone':
			/*
			 * must be 10 digits long, no letters or special chars allowed
			 */
			regex = new RegExp(/^(\d{10})$/g);
			obj.safe = regex.test(obj.value);
			break;
			
		default: break;
		}
		if(obj.safe === true)
			formData[obj.name] = obj.value;
		else
			formData[obj.name] = null;
	});
	return formData;
};

const login = (formData) => {
	ajax({
        method: "POST",
        data: formData,
        url: "/login",
        success: function(response){
        	if(response == "success")
        		window.location.replace("/calendar");
        	else
        		document.querySelector(".error").innerHTML = "Invalid credentials, please try again.";
        }
    });
};

const register = (formData) =>{
	const checkNull = () => {
		for(const property in formData){
			if(formData[property] == null)
				return false;
		}
			return true;
	};
	
	if(checkNull()){
		ajax({
			method: "POST",
			data: formData,
			url: "/register",
			success: function(response){
			    window.location.replace("/calendar");
			}
		});
	}
};