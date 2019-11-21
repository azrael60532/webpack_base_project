import '../../style/screen.styl';
import '../../style/style.styl';
import device from 'current-device';
var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');

window.disableScrolling = function(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){
        window.scrollTo(x, y);
    };
}
window.enableScrolling = function(){
    window.onscroll=function(){};
}

window.scrollToId = function(id,headerH){
	var h = (headerH)?headerH:0;
	$body.stop().animate({
		scrollTop: $(id).offset().top - h
	}, 1000);
}
window.track = function(act,cat,label){
	gtag('event', act, {
	'event_category': cat,
	'event_label': label
	});
	ga('send','event',cat,act,label,'1');
	ma('send','event',cat,label, '1');
}

window.createCookie = function(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

window.readCookie = function(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
	return null;
}

window.eraseCookie = function(name) {
    createCookie(name, "", -1);
}

$(function(){
});
// 呼叫JS 兩種方法
// 方法1.
// function aa(){
// 	console.log(212)
// }
// window.aa = aa
// 2方法.
// window.aa = function(){
// 	console.log(212)
// }