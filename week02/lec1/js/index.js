(function(){
var form = document.getElementsByClassName('main-form')[0];
form.addEventListener('change', function(e){
	fullFormValidation();
})

var topInput = document.getElementsByClassName('place-order-button')[0];
var bottomInput = document.getElementsByClassName('place-order-button')[1];

var checkbox = document.getElementsByClassName('check-terms')[0];

function fullFormValidation() {
	var arrOfBoolean = [username.validation,
						email.validation,
						pass.validation,
						date.validation,
						code.validation,
						checkbox.checked];
	function validation(arrOfBool) {
		var result = true;
		arrOfBool.forEach(function(bool){
			if(!bool) result = false;
		});
		return result
	}

	if(validation(arrOfBoolean)) {
		topInput.disabled = false;
		bottomInput.disabled = false;
	}
}

var username = document.getElementsByClassName('username')[0];
username.validation = false;
blockInputChars(username, /^[a-zA-Z\s.-]+$/);
inputValidate(username, /^[a-zA-Z\s]+/);

var email = document.getElementsByClassName('email')[0];
email.validation = false;
inputValidate(email, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

var pass = document.getElementsByClassName('pass')[0];
pass.validation = false;
inputValidate(pass, /^(?=.*\d)(?=.*[a-z])\w{6,}$/);

var creditNum = document.getElementsByClassName('card-number')[0];
creditNum.validation = false;
creditCardInputChars(creditNum, /^[0-9]+$/);
creditCardValidate(creditNum, /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/);

var date = document.getElementsByClassName('card-date')[0];
date.validation = false;
dateInputChars(date, /^[0-9]+$/);
inputValidate(date, /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/);

var code = document.getElementsByClassName('card-code')[0];
code.validation = false;
blockInputChars(code, /^[0-9]+$/);
inputValidate(code, /[0-9]{3}/);

var rangeInput = document.getElementsByClassName('urgent-input')[0];

var greenLabel = document.getElementsByClassName('range-first-label')[0];
var orangeLabel = document.getElementsByClassName('range-second-label')[0];
var redLabel = document.getElementsByClassName('range-third-label')[0];

rangeInput.addEventListener('change', function(e){
	changeRangeInputStyle(rangeInput.valueAsNumber);
})

function changeRangeInputStyle(value) {
	rangeInput.classList.remove("position-2", "position-1", "position0", "position1", "position2");
	document.getElementsByClassName('range-label actived')[0].classList.remove("actived");
	if(value < 25) {
		greenLabel.classList.add("actived");
		rangeInput.classList.add("position-2");
	} else if(value >= 25 && value < 50) {
		orangeLabel.classList.add("actived");
		rangeInput.classList.add("position-1");
	} else if(value >= 50 && value < 75) {
		orangeLabel.classList.add("actived");
		rangeInput.classList.add("position0");
	} else if(value >= 75 && value < 100) {
		orangeLabel.classList.add("actived");
		rangeInput.classList.add("position1");
	} else {
		redLabel.classList.add("actived");
		rangeInput.classList.add("position2");
	}
}

function blockInputChars(element, regex) {
	element.addEventListener('keypress', function (event) {
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
			event.preventDefault();
			return false;
		}
	});
};

function inputValidate(element, regex) {
	var checkInputTimer;
	element.addEventListener('input', function (event) {
		element.parentElement.classList.remove("input-invalid", "input-valid");
		element.validation = false;
		clearTimeout(checkInputTimer);
		if(regex.test(element.value)) {
			element.validation = true;
			checkInputTimer = setTimeout(function(){
				element.parentElement.classList.add("input-valid");
			}, 1000)
		} else {
			checkInputTimer = setTimeout(function(){
				element.parentElement.classList.add("input-invalid");
			}, 1000)
		}
		fullFormValidation();
	});
};

function creditCardInputChars(element, regex) {
	element.addEventListener('keypress', function (event) {
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
			event.preventDefault();
			return false;
		}
		var number = element.value.split(' ').join('');
		if(number.length > 0 && number.length < 16 && number.length % 4 === 0) {
			if (element.value.slice(-1) === ' ') return;
			element.value += ' ';
		}
	});
};

function creditCardValidate(element, regex) {
	var checkInputTimer;
	element.addEventListener('input', function (event) {
		element.parentElement.classList.remove("input-invalid", "input-valid");
		element.validation = false;
		clearTimeout(checkInputTimer);
		var number = element.value.split(' ').join('');
		if(regex.test(number)) {  
			element.validation = true;
			checkInputTimer = setTimeout(function(){
				element.parentElement.classList.add("input-valid");

			}, 1000)
		} else {
			checkInputTimer = setTimeout(function(){
				element.parentElement.classList.add("input-invalid");
			}, 1000)
		}
		fullFormValidation();
	});
}

function dateInputChars(element, regex) {
	element.addEventListener('keypress', function (event) {
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (!regex.test(key)) {
			event.preventDefault();
			return false;
		}
		var date = element.value.split('/').join('');
		if(date.length > 0 && date.length < 8 && date.length % 2 === 0) {
			if (element.value.slice(-1) === '/') return;
			element.value += '/';
		}
	});
};
})();
