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


/**/
$(function(){
	$('form').submit(function(){
  		let res = $('form').serialize();
		$.post('https://script.google.com/macros/s/AKfycbxNPFtFjz9bdFBvJO4Phyk1V4XV3B_cvJ39FR53g3S_5Tkl4zO4ye6GhgGSm5dPjOO06A/exec', res);
		//$.post('https://script.google.com/macros/s/AKfycbz25b_XtOPuwGGizMAfiZHfxunzDI-hO2qhuWuf3BQbU8yXdqBhGFYUvZlyz1KRiveRKg/exec', res);
		$('#splash').delay(1000).fadeIn('slow', function(){
			$('#splash-end-logo').fadeIn('slow');
		});
		setTimeout(liff.closeWindow, 6000);
		return false;
	});
});
