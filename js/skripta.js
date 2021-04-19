var upozorenje = {
	poruka: "Grad mora biti velikim slovima"
}

function proveraForme(forma) {
	var retVal = true;

	if(forma.ime.value.trim() == ""){
		retVal = false;
	}
	if(forma.prezime.value.trim() == ""){
		retVal = false;
	}

	var jmbg = forma.jmbg.value.trim()
	if(jmbg == "" || isNaN(jmbg) || jmbg.length != 13){
		retVal = false;
	}

	var grad = forma.grad.value.trim();
	if(grad == "" || grad.toUpperCase() != grad){
		retVal = false;
		callAlertFunction(upozorenje, ispisiPoruku);
	}

	return retVal;
}

function callAlertFunction(parametar, callback){
	callback(parametar);
}

function ispisiPoruku(p){
	alert(p.poruka);
}


function blurJMBG(inputPolje){
	var jmbg = inputPolje.value.trim();
	if(jmbg == "" || isNaN(jmbg) || jmbg.length != 13){
		inputPolje.previousElementSibling.classList.add("redText");
		document.getElementById("submitBtn").disabled = true;
	}else{
		inputPolje.previousElementSibling.classList.remove("redText");
		inputPolje.parentElement.parentElement.querySelector("#submitBtn").disabled = false;
	}
}

function blurGrad(inputPolje){
	var grad = inputPolje.value.trim();
	if(grad == "" || grad.toUpperCase() != grad){
		inputPolje.previousElementSibling.classList.add("redText");
	}else{
		inputPolje.previousElementSibling.classList.remove("redText");
	}
}
