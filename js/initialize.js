const url = new URL(document.location);
const params = new URLSearchParams(url.search);
const id = params.get('id');

window.onload = function(e){
	liff.init({
		liffId:id
	}).then(() =>{
		$("#splash-logo").delay(1200).fadeOut('slow');
		initializeApp();
		$("#splash").delay(1500).fadeOut('slow',function(){//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述
			$('body').addClass('appear');//フェードアウト後bodyにappearクラス付与
		});
	}).catch((err) => {
		window.alert(err);
		console.log('LIFF Initialization failed ', err);
	});
};

const name = params.get('name').toString();;
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
		$.post('https://script.google.com/macros/s/AKfycbyCiL0cL_JPghM1ufI60IJAP0d7LFTXYDPnxoNORNbqwf4ggfZoW_v00mOurCYmRV9_mA/exec', res);
		$('body').delay(1200).fadeOut('slow', function(){
			window.alert("body fade outed.");
			$('body').removeClass('appear');
			$('body').addClass('close');
		});
		$('#splash').delay(1500).fadeIn('slow', function(){
			window.alert("splash fade inned.");
			$('#splash-end-logo').delay(1200).fadeIn('slow');
			liff.closeWindow();
		});
		return false;
	});
});
