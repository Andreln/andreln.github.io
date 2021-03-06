//------------- TOGGLE VISIBILITY ------------- //

function connectLoaderToggle(divShowId, divHideId) {
	let divShow = document.getElementById(divShowId);
	let divHide = document.getElementById(divHideId);

	divShow.style.display = 'block';
	divHide.style.display = 'none';
}

function buttonToggle(buttonShowId, buttonHideId) {
	let buttonShow = document.getElementById(buttonShowId);
	let buttonHide = document.getElementById(buttonHideId);

	buttonShow.style.display = 'block';
	buttonHide.style.display = 'none';
}

function toggleDiv(divId){
	let div = document.getElementById(divId);

	if(div.style.display !== 'none') {
		div.style.display ='none';
	}
	else{
		div.style.display = 'block';
	}
}


function View(thisPage) {

	let div = document.getElementsByClassName("View");

	for(i = 0; i<div.length; i++) {

		if(thisPage !== div[i].id) {
			div[i].style.display = 'none';
		}
		else {
			div[i].style.display = 'block';
		}
	}

	document.getElementById('Dropdown').style.display = 'hide';

}

function statusBar(status){
	let connectedBar = document.getElementById('connectedProgress');
	let disconnectedBar = document.getElementById('notConnectedProgress');

	if(status=='connected'){
		connectedBar.style.display = 'block';
	}
	else {
		connectedBar.style.display = 'none';
	}

	if(status=='notConnected'){
		disconnectedBar.style.display = 'block';
	}
	else {
		disconnectedBar.style.display = 'none';
	}
}
