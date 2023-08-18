function killErrors() {
return true;
}
window.onerror=killErrors;

var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);

var ietype="";
if(document.getElementById)
{
ietype="Public";
}
else if(document.all)
{
ietype="IE4"
}
else if(document.layers)
{
ietype="NS4"
}

function $$(obj){
switch(ietype)
{
  case "Public":
  {
   return document.getElementById(obj);
  }
   break;
  case "IE4":
  {
   return document.all[obj];
  }
   break;
  case "NS4":
  {
   return document.layers[obj];
  }
   break;
}
}

function copyText(obj) 
{
	//copyText(document.all.code)  <input id=code>
var rng = document.body.createTextRange();
rng.moveToElementText(obj);
rng.scrollIntoView();
rng.select();
rng.execCommand("Copy");
rng.collapse(false);
}

function CopyUrl(v)
{
	var txt = v;
		{
      if(window.clipboardData) {       
               window.clipboardData.clearData();
               window.clipboardData.setData("Text", txt);
			   alert("复制成功，请粘贴到你的QQ或MSN上推荐给你的好友");
       } else if(navigator.userAgent.indexOf("Opera") != -1) {
            window.location = txt;       
       } else if (window.netscape) {       
           try {       
                 netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");       
            } catch (e) {       
                 alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'");       
            }       
           var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);       
           if (!clip)       
                return;       
           var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);       
           if (!trans)       
                return;       
            trans.addDataFlavor('text/unicode');       
           var str = new Object();       
           var len = new Object();       
           var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);       
           var copytext = txt;       
            str.data = copytext;       
            trans.setTransferData("text/unicode",str,copytext.length*2);       
           var clipid = Components.interfaces.nsIClipboard;       
           if (!clip)
                return false;
            clip.setData(trans,null,clipid.kGlobalClipboard);
            alert("复制成功，请粘贴到你的QQ或MSN上推荐给你的好友") ;      
       }       
 }
}



function createxmlhttp()
{
	xmlhttpobj = false;
	try{
		xmlhttpobj = new XMLHttpRequest;
	}catch(e){
		try{
			xmlhttpobj=new ActiveXObject("MSXML2.XMLHTTP");
		}catch(e2){
			try{
				xmlhttpobj=new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e3){
				xmlhttpobj = false;
			}
		}
	}
	return xmlhttpobj;
	
}

function xmlobjpost(url,act){
	var xmlobj;
	xmlobj=createxmlhttp();
	xmlobj.open("post",url,true);
	xmlobj.setRequestHeader("Content-Type","gb2312"); 
	xmlobj.onreadystatechange=function(){
		if (xmlobj.status!=404){
			act(xmlobj.status);
		}
	};
	xmlobj.send(null);
}

function xmlobjok(url,act){
	var xmlobjhdw;
	xmlobjhdw=createxmlhttp();
	xmlobjhdw.open("post",url,true);
	xmlobjhdw.setRequestHeader("Content-Type","gb2312"); 
	xmlobjhdw.onreadystatechange=function(){
			if (xmlobjhdw.readyState==4){
				if (xmlobjhdw.status==200){
					act(xmlobjhdw.responseText);
				}
			}
	};
	xmlobjhdw.send(null);
}


function AddToFavorite(titlev)   
{   
    var url = location.href; 
	var title = document.title;
	if(titlev!='0'){
		title=titlev+"__"+title;
		}
	
	try{ 
	window.external.addFavorite(url, title); 
		}catch (e){ 
		try{ 
	window.sidebar.addPanel(title, url, ""); 
			}catch (e){
			} 
		}  
}

function trim(tv) {   
    var r = tv.replace(/(^\s*)|(\s*$)/g, "");   
    r = Lremoveblank(r);   
    r = Rremoveblank(r);   
    return r;   
}   
  
function Lremoveblank(s) {   
    if (s.length == 1 && s.charCodeAt(0) == 160)   
        return "";   
    if (s.charCodeAt(0) == 160) {   
        s = s.substr(1, s.length - 1);   
        return Lremoveblank(s);   
    }   
    else {   
        return s;   
    }   
}   
  
function Rremoveblank(s) {   
    if (s.length == 1 && s.charCodeAt(0) == 160)   
        return "";   
    if (s.charCodeAt(s.length-1) == 160) {   
        s = s.substr(0, s.length - 1);   
        return Rremoveblank(s);   
    }   
    else {   
        return s;   
    }   
}

function utf8(wide) { 
var c, s; 
var enc = ""; 
var i = 0; 
while(i<wide.length) { 
c= wide.charCodeAt(i++); 
// handle UTF-16 surrogates 
if (c>=0xDC00 && c<0xE000) continue; 
if (c>=0xD800 && c<0xDC00) { 
if (i>=wide.length) continue; 
s= wide.charCodeAt(i++); 
if (s<0xDC00 || c>=0xDE00) continue; 
c= ((c-0xD800)<<10)+(s-0xDC00)+0x10000; 
} 
// output value 
if (c<0x80) enc += String.fromCharCode(c); 
else if (c<0x800) enc += String.fromCharCode(0xC0+(c>>6),0x80+(c&0x3F)); 
else if (c<0x10000) enc += String.fromCharCode(0xE0+(c>>12),0x80+(c>>6&0x3F),0x80+(c&0x3F)); 
else enc += String.fromCharCode(0xF0+(c>>18),0x80+(c>>12&0x3F),0x80+(c>>6&0x3F),0x80+(c&0x3F)); 
} 
return enc; 
} 

var hexchars = "0123456789ABCDEF"; 

function toHex(n) { 
return hexchars.charAt(n>>4)+hexchars.charAt(n & 0xF); 
} 

var okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"; 

function encodeURIComponentNew(s) { 
var s = utf8(s); 
var c; 
var enc = ""; 
for (var i= 0; i<s.length; i++) { 
if (okURIchars.indexOf(s.charAt(i))==-1) 
enc += "%"+toHex(s.charCodeAt(i)); 
else 
enc += s.charAt(i); 
} 
return enc; 
} 

function URLEncode(fld) 
{ 
if (fld == "") return false; 
var encodedField = ""; 
var s = fld; 
if (typeof encodeURIComponent == "function") 
{ 
// Use javascript built-in function 
// IE 5.5+ and Netscape 6+ and Mozilla 
encodedField = encodeURIComponent(s); 
} 
else 
{ 
// Need to mimic the javascript version 
// Netscape 4 and IE 4 and IE 5.0 
encodedField = encodeURIComponentNew(s); 
} 
//alert ("New encoding: " + encodeURIComponentNew(fld) + 
// "\n escape(): " + escape(fld)); 
return encodedField; 
}


var TINY={};

function T$(i){return document.getElementById(i)}

TINY.box=function(){
	var p,m,b,fn,ic,iu,iw,ih,ia,f=0;
	return{
		show:function(c,u,w,h,a,t){
			if(!f){
				p=document.createElement('div'); p.id='tinybox';
				m=document.createElement('div'); m.id='tinymask';
				b=document.createElement('div'); b.id='tinycontent';
				document.body.appendChild(m); document.body.appendChild(p); p.appendChild(b);
				m.onclick=TINY.box.hide; window.onresize=TINY.box.resize; f=1
			}
			if(!a&&!u){
				p.style.width=w?w+'px':'auto'; p.style.height=h?h+'px':'auto';
				p.style.backgroundImage='none'; b.innerHTML=c
			}else{
				b.style.display='none'; p.style.width=p.style.height='100px'
			}
			this.mask();
			ic=c; iu=u; iw=w; ih=h; ia=a; this.alpha(m,1,80,3);
			if(t){setTimeout(function(){TINY.box.hide()},1000*t)}
		},
		fill:function(c,u,w,h,a){
			if(u){
				p.style.backgroundImage='';
				var x=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
				x.onreadystatechange=function(){
					if(x.readyState==4&&x.status==200){TINY.box.psh(x.responseText,w,h,a)}
				};
				x.open('GET',c,1); x.send(null)
			}else{
				this.psh(c,w,h,a)
			}
		},
		psh:function(c,w,h,a){
			if(a){
				if(!w||!h){
					var x=p.style.width, y=p.style.height; b.innerHTML=c;
					p.style.width=w?w+'px':''; p.style.height=h?h+'px':'';
					b.style.display='';
					w=parseInt(b.offsetWidth); h=parseInt(b.offsetHeight);
					b.style.display='none'; p.style.width=x; p.style.height=y;
				}else{
					b.innerHTML=c
				}
				this.size(p,w,h,4)
			}else{
				p.style.backgroundImage='none'
			}
		},
		hide:function(){
			TINY.box.alpha(p,-1,0,5)
		},
		resize:function(){
			TINY.box.pos(); TINY.box.mask()
		},
		mask:function(){
			m.style.height=TINY.page.theight()+'px';
			m.style.width=''; m.style.width=TINY.page.twidth()+'px'
		},
		pos:function(){
			var t=(TINY.page.height()/2)-(p.offsetHeight/2); t=t<10?10:t;
			p.style.top=(t+TINY.page.top())+'px';
			p.style.left=(TINY.page.width()/2)-(p.offsetWidth/2)+'px'
		},
		alpha:function(e,d,a,s){
			clearInterval(e.ai);
			if(d==1){
				e.style.opacity=0; e.style.filter='alpha(opacity=0)';
				e.style.display='block'; this.pos()
			}
			e.ai=setInterval(function(){TINY.box.twalpha(e,a,d,s)},20)
		},
		twalpha:function(e,a,d,s){
			var o=Math.round(e.style.opacity*100);
			if(o==a){
				clearInterval(e.ai);
				if(d==-1){
					e.style.display='none';
					e==p?TINY.box.alpha(m,-1,0,3):b.innerHTML=p.style.backgroundImage=''
				}else{
					e==m?this.alpha(p,1,100,5):TINY.box.fill(ic,iu,iw,ih,ia)
				}
			}else{
				var n=o+Math.ceil(Math.abs(a-o)/s)*d;
				e.style.opacity=n/100; e.style.filter='alpha(opacity='+n+')'
			}
		},
		size:function(e,w,h,s){
			e=typeof e=='object'?e:T$(e); clearInterval(e.si);
			var ow=e.offsetWidth, oh=e.offsetHeight,
			wo=ow-parseInt(e.style.width), ho=oh-parseInt(e.style.height);
			var wd=ow-wo>w?-1:1, hd=(oh-ho>h)?-1:1;
			e.si=setInterval(function(){TINY.box.twsize(e,w,wo,wd,h,ho,hd,s)},20)
		},
		twsize:function(e,w,wo,wd,h,ho,hd,s){
			var ow=e.offsetWidth-wo, oh=e.offsetHeight-ho;
			if(ow==w&&oh==h){
				clearInterval(e.si); p.style.backgroundImage='none'; b.style.display='block'
			}else{
				if(ow!=w){e.style.width=ow+(Math.ceil(Math.abs(w-ow)/s)*wd)+'px'}
				if(oh!=h){e.style.height=oh+(Math.ceil(Math.abs(h-oh)/s)*hd)+'px'}
				this.pos()
			}
		}
	}
}();

TINY.page=function(){
	return{
		top:function(){return document.body.scrollTop||document.documentElement.scrollTop},
		width:function(){return self.innerWidth||document.documentElement.clientWidth},
		height:function(){return self.innerHeight||document.documentElement.clientHeight},
		theight:function(){
			var d=document, b=d.body, e=d.documentElement;
			return Math.max(Math.max(b.scrollHeight,e.scrollHeight),Math.max(b.clientHeight,e.clientHeight))
		},
		twidth:function(){
			var d=document, b=d.body, e=d.documentElement;
			return Math.max(Math.max(b.scrollWidth,e.scrollWidth),Math.max(b.clientWidth,e.clientWidth))
		}
	}
}();


//document.write("<body onselectstart='return false' ondrag='return false' oncontextmenu='return false'>");

function checksaygbook()
	{
	  if ($$('contentgbook').value.length<3){
			alert("Please enter your content");
			$$('contentgbook').focus();
			return false;
			}
	}
		
function checkMaxInputgbook(form) {
	maxLen = 100;
	if (form.contentgbook.value.length > maxLen){
		form.contentgbook.value = form.contentgbook.value.substring(0,maxLen);
		alert(" Exceeds the limit of characters, set the character control in less than 100 characters!");
		}
	}

function sendmsg(obj){
	if($$(obj).value.length<1){
		alert("Please enter your content!");
		$$(obj).focus();
		return false;
		}
	else{
		xmlobjok("/gbookajax.asp?contentgbook="+trim($$(obj).value),sendok);
		$$(obj).value="";
		return true;
		}
	}
function sendok(c){
	if(c=="ok"){
		alert("Message successfully, later wait for an administrator's reply!");
		}
	else{
		alert("Not submitted successfully, try!");
		}
	}

function ResizeImage(objImage,maxWidth) {
try{
  if(maxWidth>0){
   var objImg = $(objImage);
   if(objImg.width()>maxWidth){
    objImg.width(maxWidth).css("cursor","pointer").click(function(){
     try{showModelessDialog(objImage.src);}catch(e){window.open(objImage.src);}
    });
   }
  }
}catch(e){};
}