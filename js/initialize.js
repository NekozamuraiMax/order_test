const url = new URL(document.location);
const params = new URLSearchParams(url.search);
const id = params.get('id');

window.onload = function(e){
	liff.init({
		liffId:id
	}).then(() =>{
		initializeApp();
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
		window.alert(res);
		$.post('https://script.google.com/macros/s/AKfycbzQQu0NUzmfU6BpgYW2sz0Qs909f_bjKiz4kNy_cCBGVAR5aCzqwxFPInN74Kur8GPVFg/exec', $('form').serialize());
		/*
		const genre = document.getElementById("genre").value;
		const date  = document.getElementById("datepicker").value;
		const time  = document.getElementById("scheduled-time").value;
		const e_time= document.getElementById("end-time").value;
		const freetxt= document.getElementById("textarea").value;
		const afterSchool = document.getElementById('afterSchool');
		const startCar = document.getElementById('sCar');
		const endCar = document.getElementById('eCar');
		let message="None. This is not message.";
		
		let timeMes="";
		let scar = "迎え：";
		let ecar = "送り：";
		if(genre==='reserve'){
			(afterSchool.checked) ? timeMes = timeMes+"下校後来所" : timeMes = timeMes + time;
			(startCar.checked) ? scar = scar + "有\n" : scar = scar + "無\n";
			if(endCar.checked){
				timeMes = timeMes + '~送迎車送り';
				ecar = ecar + "有\n";
			}else{
				timeMes = timeMes + '~' + e_time;
				ecar = ecar + "無\n";
			}
			message = '[児童名]\n' + name + '\n[申請内容]\n予定の追加\n'+'[指定日]\n'+date+'\n'+'[時間]\n'+ timeMes +'\n'+ '[送迎車]\n' + scar + ecar + '[伝達事項]\n'+freetxt;
		}else if(genre==='cancel'){
			message = '[児童名]\n' + name + '\n[申請内容]\nキャンセル\n'+'[指定日]\n'+date+'\n'+'[伝達事項]\n'+freetxt;
		}else if(genre==='change'){
			(afterSchool.checked) ? timeMes = timeMes+"下校後来所" : timeMes = timeMes + time;
			(startCar.checked) ? scar = scar + "有\n" : scar = scar + "無\n";
			if(endCar.checked){
				timeMes = timeMes + '~送迎車送り';
				ecar = ecar + "有\n";
			}else{
				timeMes = timeMes + '~' + e_time;
				ecar = ecar + "無\n";
			}
			message = '[児童名]\n' + name + '\n[申請内容]\n時間の変更\n'+'[指定日]\n'+date+'\n'+'[時間]\n'+ timeMes +'\n'+ '[送迎車]\n' + scar + ecar + '[伝達事項]\n'+freetxt;
		}
		sendText(message);
		*/
		return false;
	});
});
