let shippingNameField  = document.getElementById('shippingname');
let shippingAddressField  = document.getElementById('shippingaddress');
let ccNumberField  = document.getElementById('ccnum');
let ccMonthField  = document.getElementById('ccMonth');
let ccYearField  = document.getElementById('ccYear');
let ccCSVField  = document.getElementById('ccCSV');

let inputBoxesToCheck = [shippingNameField, shippingAddressField, ccNumberField,ccMonthField,ccYearField,ccCSVField,];

let billerNameField  = document.getElementById('billername');
let billerAddressField  = document.getElementById('billeraddress');

let checkBox  = document.getElementById('checkboxbiller');

var submit = document.querySelector('.submit-button');
var progressBar = document.getElementById('progress');

//If a different biller is selected then add to inputBoxesToCheck. If unselected then remove.
checkBox.onclick =function(){
	if(checkBox.checked){
		inputBoxesToCheck.push(billerNameField);
		inputBoxesToCheck.push(billerAddressField);
	} else {
		inputBoxesToCheck.pop();
		inputBoxesToCheck.pop();
	}
	checkBoxesAreFilledOut();
 }

//Looks at all fields and tells user through alert what is not valid.
submit.onclick = function () {
	let alertString = '';
	checkBoxesAreFilledOut();
	alertErrorOrNoError();
	function checkBoxesAreFilledOut(){
	 	inputBoxesToCheck.forEach(function(inputbox){
			if(!inputbox.checkValidity()){
				 if(inputbox.value.length===0)
				 	alertString =  alertString.concat(inputbox.placeholder + ': field is empty!\n');
				 else
				 	alertString = alertString.concat(inputbox.placeholder + ': field is incorrect!\n');
			}
	 	});
	 }
	 function alertErrorOrNoError(){
	 	if(alertString == '')
	 		alert('Order Submitted!');
	 	else
	 		alert(alertString);
	 }
};

//Works out how many displayed textboxes are filled out correctly.
function checkBoxesAreFilledOut(){
	let totalBoxes=0;
	let boxesCorrect=0;
	inputBoxesToCheck.forEach(function(inputbox){
		totalBoxes++;
		if(inputbox.checkValidity())
			boxesCorrect++;
	});
	progressBar.value = (boxesCorrect/totalBoxes)*progressBar.max;
}
//create events for each textbox and call checkBoxesAreFilledOut when a textbox value is changed.
let textBoxes = [shippingNameField, shippingAddressField, ccNumberField,ccMonthField,ccYearField,ccCSVField,billerNameField,billerAddressField];
textBoxes.forEach(function(inputbox){
	inputbox.addEventListener('input', function(){
		checkBoxesAreFilledOut();
	});
});
