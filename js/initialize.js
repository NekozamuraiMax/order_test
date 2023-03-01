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
	$('#name').text(name);
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
		const genre = document.getElementById("genre").value;
		const date  = document.getElementById("datepicker").value;
		const time  = document.getElementById("scheduled-time").value;
		const e_time= document.getElementById("end-time").value;
		const freetxt= document.getElementById("textarea").value;
		let message="None. This is not message.";
		
		if(genre==='reserve'){
			message = '[児童名]\n' + name + '\n[申請内容]\n予定の追加\n'+'[指定日]\n'+date+'\n'+'[時間]\n'+time+'\n'+'[伝達事項]\n'+freetxt;
		}else if(genre==='cancel'){
			message = '[児童名]\n' + name + '\n[申請内容]\nキャンセル\n'+'[指定日]\n'+date+'\n'+'[伝達事項]\n'+freetxt;
		}else if(genre==='change'){
			message = '[児童名]\n' + name + '\n[申請内容]\n利用時間の変更\n'+'[指定日]\n'+date+'\n'+'[時間]\n'+time+'～'+e_time+'\n'+'[伝達事項]\n'+freetxt;
		}
		sendText(message);
		return false;
	});
});
