const url = new URL(document.location);
const params = new URLSearchParams(url.search);
const id = params.get('id');

window.onload = function(e){
	liff.init({
		liffId:id
	}).then(() =>{
		$("#splash-logo").delay(1200).fadeOut('slow');
		initializeApp();
		$("#splash").delay(1500).fadeOut('slow',function(){
			$('body').addClass('appear');
		});
	}).catch((err) => {
		window.alert(err);
		console.log('LIFF Initialization failed ', err);
	});
};

const name = params.get('name').toString();
function initializeApp() {
    // ログインチェック
    if (liff.isLoggedIn()) {
        //ログイン済
	const idToken = liff.getDecodedIDToken();
      	const userId = idToken.sub;
	$('#name').text(name);
	$('form').append('<input type="hidden" name="userId" id="userId">');
	$('form').append('<input type="hidden" name="nameinput" id="nameinput">');
	document.getElementById("userId").value = userId;
	document.getElementById("nameinput").value = name;
    } else {
        // 未ログイン
        let result = window.confirm("LINE Loginしますか？");
        if(result) {
            liff.login();
        }
    }
}



function sendText(text){
	if(!liff.isInClient()){
		window.alert('This button is unavailable as LIFF is currently being opened in an external browser.');
	}else{
		liff.sendMessages([
			{
			type: 'text',
			text: text
			}
		]).then(function(){
			liff.closeWindow();
		}).catch(function(error){
			window.alert('Failed to send message ' + error);
		});
	}
}



$(function(){
	$('form').submit(function(){
  		let res = $('form').serialize();
		$.post('https://script.google.com/macros/s/AKfycby7DZDBDMmq5gm5-HV-Lc_xHD-0umcyYc7NqzX27G0Kp0jJf4ne8euMZwtD2mDGwUtZdQ/exec', res);
		//$.post('https://script.google.com/macros/s/AKfycbw3pUQJmgpIGQzkAPQKZLP0tftiSQHdGYh_XRzblnt97DDyczb-k5YKuxT5icz315bIfw/exec', res);
		$('#splash').delay(1000).fadeIn('slow', function(){
			$('#splash-end-logo').fadeIn('slow');
		});
		setTimeout(liff.closeWindow, 6000);
		return false;
	});
});
