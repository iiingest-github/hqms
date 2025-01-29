var disabled = 1;
var srcs = 90;//加载资源数
var timer;

function init(){
	while(srcs){}
	setTimeout(function(){
		document.getElementById("loading").style.display = "none";
		var title = document.getElementById("title");
		scenefadein(title);
		setTimeout(function(){disabled = 0},1000);
	},1000);
}
function startgame(){
	if(disabled == 0){
		disabled = 1;
		index = 4;love = 5;checklist = ["","",0,"","","","","","","",""];
		var gbg = document.getElementsByClassName("gbg");
		for(var i=0;i<gbg.length;i++){gbg[i].setAttribute("hidden",true);gbg[i].style.opacity = "0";}
		var gchara = document.getElementsByClassName("gchara");
		for(var i=0;i<gchara.length;i++){gchara[i].setAttribute("hidden",true);}
		document.getElementById("gname").style.opacity = "0";
		document.getElementById("gtext").innerHTML = "";
		var title = document.getElementById("title");
		var game = document.getElementById("game");
		game.style.backgroundImage = "url('src/bg1.jpg')";
		scenefadeout(title);
		setTimeout(function(){scenefadein(game);},3000);
		setTimeout(function(){disabled = 0;next();},5000);
	}
}
function showsp(sp){
	document.getElementById("tblank").setAttribute("hidden",true);
	document.getElementById("tmenu").setAttribute("hidden",true);
	document.getElementById(sp).style.display = "block";
}
function hidesp(sp){
	document.getElementById(sp).scrollTop = 0;
	document.getElementById(sp).style.display = "none";
	document.getElementById("tblank").removeAttribute("hidden");
	document.getElementById("tmenu").removeAttribute("hidden");
}
function showmenu(){
	disabled = 1;
	document.getElementById("menu").style.display = "block";
}
function hidemenu(){
	if((index!=46)&&(index!=47)&&(index!=191)){disabled = 0;}
	document.getElementById("menu").style.display = "none";
}
function showwa(wa){
	document.getElementById("menu").style.display = "none";
	document.getElementById(wa).style.display = "block";
}
function hidewa(wa){
	document.getElementById(wa).style.display = "none";
	document.getElementById("menu").style.display = "block";
}
function totitle(){
	document.getElementById("gname").innerHTML = "";
	document.getElementById("gtext").innerHTML = "";
	disabled = 1;
	document.getElementById("warning2").style.display = "none";
	gameover();
}
function checkinp(me){
	if((me.value == "hlaf")||(me.value == "HLAF")){
		me.value = "";
		document.getElementById("pw").style.display = "none";
		document.getElementById("sp").innerHTML = spcontent;
		document.getElementById("sp").style.display = "block";
	}
}
function skip(){
	if((index == 46)||(index == 47)||(index == 122)||((index >= 124)&&(index <= 138))||(index == 191)||(index == 240)||((index >= 242)&&(index <= 269))||(index == 331)||(index == 397)||(index == 468)||(index == 611)||(index >= 755)){
		document.getElementById("warning1").style.display = "none";
		document.getElementById("warning3").style.display = "block";
	}
	else{
		disabled = 1;
		document.getElementById("warning1").style.display = "none";
		if((index < 46)||((index >= 49)&&(index <= 68))){index = 46;}
		else if((index > 47)&&(index < 122)){index = 122;}
		else if((index > 122)&&(index < 191)){index = 191;}
		else if((index > 191)&&(index < 240)){index = 240;}
		else if((index > 240)&&(index < 331)){index = 331;}
		else if((index > 331)&&(index < 397)){index = 397;}
		else if((index > 397)&&(index < 468)){index = 468;}
		else if((index > 468)&&(index < 611)){index = 611;}
		else if((index > 611)&&(index < 755)){index = 755;}
		showbg();checkindex();
	}
	
}

function scenefadein(scene){
	scene.style.display = "block";
	scene.style.opacity = 0;
	var i = 0;
	var t = setInterval(function(){
		if(i < 1){
			i += 0.1;
			scene.style.opacity = i;
		}else{
			clearInterval(t);
		}
	},100);
}
function scenefadeout(scene){
	var i = 1;
	var t = setInterval(function(){
		if(i > 0){
			i -= 0.1;
			scene.style.opacity = i;
		}else{
			scene.style.display = "none";
			scene.style.opacity = 1;
			clearInterval(t);
		}
	},100);
}
function showimg(){
	if(lines[index][0] != lines[index-1][0]){showbg();}
	var gchara = document.getElementsByClassName("gchara");
	for(var i=0;i<gchara.length;i++){gchara[i].setAttribute("hidden",true);}
	if(lines[index][1] != ""){document.getElementById(lines[index][1]).removeAttribute("hidden");}
	if(lines[index][2] == ""){document.getElementById("gname").style.opacity = "0";}
	else{document.getElementById("gname").innerHTML = lines[index][2];
		document.getElementById("gname").style.opacity = "1";}
	document.getElementById("gtext").innerHTML = "";
}
function showbg(){
	var gbg = document.getElementsByClassName("gbg");
	for(var i=0;i<gbg.length;i++){gbg[i].setAttribute("hidden",true);gbg[i].style.opacity = "0";}
	document.getElementById(lines[index][0]).removeAttribute("hidden");
	setTimeout(function(){
		document.getElementById(lines[index][0]).style.opacity = "1";
	},10);
	setTimeout(function(){
		document.getElementById("game").style.backgroundImage = "url('src/bg" + lines[index][0] + ".jpg')";
	},310);
}
function showtxt(){
	var i = 0;
		clearInterval(timer);
		timer = setInterval(function(){
			if(i < lines[index][3].length){
				document.getElementById("gtext").innerHTML += lines[index][3][i];
				i += 1;
			}else{
				disabled = 0;
				clearInterval(timer);
			}
		},30);
}
function showinp(listi){
	var i = 0;
		clearInterval(timer);
		timer = setInterval(function(){
			if(i < lines[index][3].length){
				document.getElementById("gtext").innerHTML += lines[index][3][i];
				i += 1;
			}else{
				document.getElementById("game").style.height = window.innerHeight + "px";//固定画面尺寸
				document.getElementById("gtext").innerHTML += "<br/><br/>";
				var newinp = document.createElement("input");
				newinp.id = "newinp";
				newinp.style.width = "80px";
				var newbtn = document.createElement("span");
				newbtn.id = "newbtn";
				newbtn.className = "btn btn2";
				newbtn.innerHTML = "ok";
				newbtn.setAttribute("onclick","sbm(" + listi + ")");
				document.getElementById("gtext").appendChild(newinp);
				document.getElementById("gtext").appendChild(newbtn);
				clearInterval(timer);
			}
		},50);
}
function sbm(listi){
	var inp = document.getElementById("newinp");
	if(inp.value != ""){
		document.getElementById("game").style.height = "";//恢复自适应
		checklist[listi] = inp.value;
		disabled = 0;
		next();
	}
}
function showsel1(listi,text1,text2,text3){
	var i = 0;
	clearInterval(timer);
	timer = setInterval(function(){
		if(i < lines[index][3].length){
			document.getElementById("gtext").innerHTML += lines[index][3][i];
			i += 1;
		}else{
			disabled = 1;
			document.getElementById("sbtn1").innerHTML = text1;
			document.getElementById("sbtn1").setAttribute("onclick","sel('A'," + listi + ")");
			document.getElementById("sbtn2").innerHTML = text2;
			document.getElementById("sbtn2").setAttribute("onclick","sel('B'," + listi + ")");
			document.getElementById("sbtn3").innerHTML = text3;
			document.getElementById("sbtn3").setAttribute("onclick","sel('C'," + listi + ")");
			document.getElementById("select1").style.display = "block";
			clearInterval(timer);
		}
	},50);
}
function showsel2(listi,text1,text2){
	var i = 0;
	clearInterval(timer);
	timer = setInterval(function(){
		if(i < lines[index][3].length){
			document.getElementById("gtext").innerHTML += lines[index][3][i];
			i += 1;
		}else{
			disabled = 1;
			document.getElementById("sbtn4").innerHTML = text1;
			document.getElementById("sbtn4").setAttribute("onclick","sel('A'," + listi + ")");
			document.getElementById("sbtn5").innerHTML = text2;
			document.getElementById("sbtn5").setAttribute("onclick","sel('B'," + listi + ")");
			document.getElementById("select2").style.display = "block";
			clearInterval(timer);
		}
	},50);
}
function showsel3(){
	var i = 0;
	clearInterval(timer);
	timer = setInterval(function(){
		if(i < lines[index][3].length){
			document.getElementById("gtext").innerHTML += lines[index][3][i];
			i += 1;
		}else{
			disabled = 1;
			document.getElementById("select3").style.display = "block";
			clearInterval(timer);
		}
	},50);
}
function sel(abc,listi){
	checklist[listi] = abc;
	disabled = 0;
	next();
}
function changescene(bgi){
	scenefadeout(game);
	setTimeout(function(){
		var gbg = document.getElementsByClassName("gbg");
		for(var i=0;i<gbg.length;i++){gbg[i].setAttribute("hidden",true);gbg[i].style.opacity = "0";}
		document.getElementById(bgi).removeAttribute("hidden");
		document.getElementById(bgi).style.opacity = "1";
		document.getElementById("game").style.backgroundImage = "url('src/bg" + bgi + ".jpg')";
		scenefadein(game);
	},3000);
	setTimeout(function(){disabled = 0;next();},5000);
}
function gameover(){
	scenefadeout(game);
	setTimeout(function(){document.getElementById("game").style.backgroundImage = "url('src/bg1.jpg')";scenefadein(title);},3000);
	setTimeout(function(){disabled = 0},4000);
}