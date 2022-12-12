$(window).load(function(){
	const id = "1657662321-x9g6kPw2";
	initializeLiff(id);
});

function initializeLiff(id){
	liff.init({
		liffId:id
	}).then(() =>{
		initializeApp();
	}).catch((err) => {
		console.log('LIFF Initialization failed ', err);
	});
}

function sendText(text){
	liff.sendMessages([{
		'type': 'text',
		'text': "success."
	}]).then(function(){
		liff.closeWindow();
	}).catch(function(error){
		window.alert('Failed to send message ' + error);
	});
}

const params = (new URL(document.location)).searchParams;
const key = params.get('key');

$(function(){
	/*
	$('form').submit(function(){
		const genre = document.getElementById("genre").value;
		const date  = document.getElementById("datepicker").value;
		const time  = document.getElementById("scheduled-time").value;
		const freetxt= document.getElementById("textarea").value;
		const message= '${genre}\n${date}\n${time}\n${freetxt}';
		sendText(message);
		return false;
	});
	*/
	sendText("test");
	return false;
});