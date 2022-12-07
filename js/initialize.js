$(window).load(function(){
	const liffId = "1657662321-nR14gmQy";
	initializeLiff(liffId);
});

function initializeLiff(liffId){
	liff.init({
		liffId:liffId
	}).then(() =>{
		initializeApp();
	}).catch((err) => {
		console.log('LIFF Initialization failed ', err);
	});
}

function sendText(text){
	liff.sendMessages([{
		'type': 'text',
		'text': text
	}]).then(function(){
		liff.closeWindow();
	}).catch(funciont(error){
		window.alert('Failed to send message ' + error);
	});
}

const params = (new URL(document.location)).searchParams;
const key = params.get('key');

$(function(){
	$('form').submit(function(){
		const genre = document.getElementById("genre").value;
		const date  = document.getElementById("datepicker").value;
		const time  = document.getElementById("scheduled-time").value;
		const freetxt= document.getElementById("textarea").value;
		const message= '${genre}\n${date}\n${time}\n${freetxt}';
		sendText(message);
		return false;
	});
});