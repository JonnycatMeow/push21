let my={};function numberodometerMain(base){my.base=typeof base!=='undefined'?base:2;let version='0.83';w=460;h=240;digitCount=8;MIN=2;MAX=16;my.base=Math.max(MIN,Math.min(my.base,MAX))
my.prev=performance.now();let s="";s+='<div style="position:relative; width:'+w+'px; height:'+h+'px; border: 2px solid lightblue; border-radius: 10px;  margin:auto; display:block;">';s+='<canvas id="canvasId" width="'+w+'" height="'+h+'" style="z-index:1;"></canvas>';s+='<div style="z-index:2; position:absolute; top:22px; left:24px; font: 18px/22px Arial, Tahoma, sans-serif; ">Base:</div>';s+='<input type="text" id="exp" style="color: #0000ff; position:absolute; top:20px; left:80px; width:40px; background-color: white; text-align:center; padding-left:5px; font-size: 20px; border-radius: 10px; " autocomplete="off" value="'+my.base+'" onKeyUp="go()" />';s+='<input type="button" id="expUpBtn"  class="btn" style="color: #000aae;  position:absolute; top: 6px; left:128px; z-index: 3;"  value="&#x25B2;" onclick="expUp()"/>';s+='<input type="button" id="expDnBtn"  class="btn" style="color: #000aae;  position:absolute; top:30px; left:128px; z-index: 3;"  value="&#x25BC;" onclick="expDn()"/>';s+='<div style="color: #0000ff; position:absolute; top:48px; left:2px; font-size: 13px; cursor: pointer;" onclick="doBase(16)">Hexadecimal</div>';s+='<div style="color: #0000ff; position:absolute; top:66px; left:2px; font-size: 13px; cursor: pointer;" onclick="doBase(10)">Decimal</div>';s+='<div style="color: #0000ff; position:absolute; top:84px; left:2px; font-size: 13px; cursor: pointer;" onclick="doBase(2)">Binary</div>';s+='<button id="restart" style="color: #000aae;  position:absolute; top:20px; left:210px; z-index: 3;"  class="btn"  onclick="restart()"/>&#10226;</button>';s+='<div style="position:absolute; top:10px; left:250px; z-index: 3;">'
s+=playHTML(50)
s+='</div>'
let xPos=20;let yPos=175;for(i=0;i<digitCount;i++){s+='<div id="dig'+(digitCount-i)+'"'+
' style="text-align:center; position:absolute; top:'+yPos+'px; left:'+xPos+'px; width:20px; height:20px;'+
' border: 1px solid blue; padding:5px; color: black; background-color: #ddeeff; font: bold 16px/20px Arial, Tahoma, sans-serif; ">0</div>';s+='<div id="txt'+(digitCount-i)+'"'+
' style="text-align:left; position:absolute; top:'+(yPos-100)+'px; left:'+(xPos-26)+'px; width: 200px; '+
' border: none; padding:5px; font: 16px/20px Arial, Tahoma, sans-serif; 	transform: rotate(-50deg); ">?</div>';xPos+=35;}
s+='<div style="position: absolute; left: 5px; bottom: 3px; font: 10px Arial; color: #6600cc; ">&copy; 2020 MathsIsFun.com  v'+version+'</div>';s+='</div>';document.write(s);el=document.getElementById('canvasId');ratio=4;el.width=w*ratio;el.height=h*ratio;el.style.width=w+"px";el.style.height=h+"px";g=el.getContext("2d");g.setTransform(ratio,0,0,ratio,0,0);console.log('stt');numBalls=0;my.playQ=false;restart();}
function playHTML(w){let s='';s+='<style type="text/css">';s+='.playBtn { width:'+w+'px; height:'+w+'px; border-radius: 10em; }';s+='.playBtn:before, button:after {content: " "; position: absolute; }';s+='.play:before {  left: '+w*0.4+'px; top: '+w*0.22+'px; width: 0; height: 0; border: '+w*0.3+'px solid transparent; border-left-width: '+w*0.4+'px; border-left-color: blue;  }';s+='.play:hover:before {border-left-color: green; }';s+='.pause:before, .pause:after {display: block; left: '+w*0.29+'px; top: '+w*0.28+'px; width: '+w*0.19+'px; height: '+w*0.49+'px; background-color: blue; }';s+='.pause:after {left: '+w*0.6+'px; }';s+='.pause:hover:before, .pause:hover:after {background-color: green; }';s+='</style>';s+='<button id="playBtn" class="btn playBtn play"  onclick="playToggle()" ></button>';return s;}
function play(){my.playQ=false;playToggle();}
function playToggle(){let btn='playBtn';if(my.playQ){my.playQ=false;document.getElementById(btn).classList.add("play");document.getElementById(btn).classList.remove("pause");}else{my.playQ=true;document.getElementById(btn).classList.add("pause");document.getElementById(btn).classList.remove("play");anim();}}
function anim(){if(my.playQ){if(performance.now()-my.prev>500){incr1()
my.prev=performance.now();console.log('.')}
requestAnimationFrame(anim);}}
function restart(){if(my.playQ)play();for(i=0;i<digitCount;i++){let div=document.getElementById("dig"+(i+1));div.innerHTML="0";div.style.backgroundColor="#ddeeff";let s="";s+=Math.pow(my.base,i);s+=" = ";s+="<b>"+my.base+"<sup>"+i+"</sup></b>";document.getElementById("txt"+(i+1)).innerHTML=s;}
numBalls=0;g.clearRect(0,0,el.width,el.height);}
function doBase(num){document.getElementById("exp").value=num;my.base=num;restart();play();}
function incr1(){incr(1);numBalls++;drawBalls(numBalls);}
function incr(n){if(n>digitCount){clearInterval(id);}
let div=document.getElementById("dig"+n);let val=fromHex(div.innerHTML);val++;if(val>=my.base){val=0;incr(n+1);}
if(val==0){div.style.backgroundColor="#ffff00";}else{div.style.backgroundColor="#ddeeff";}
div.innerHTML=toHexx(val);}
function fromHex(v){return(parseInt(v,16));}
function toHexx(v){s=v.toString(16);s=s.toUpperCase();return(s);}
function getExp(){let num=document.getElementById("exp").value;num=num.replace(/,/gm,"");num=parseInt(num);if(isNaN(num))num=0;if(num>this.MAX)num=this.MAX;if(num<this.MIN)num=this.MIN;document.getElementById("exp").value=num;return num;}
function expDn(){let num=getExp();if(num>this.MIN){num--;document.getElementById("exp").value=num;my.base=num;restart();play();}}
function expUp(){let num=getExp();if(num<this.MAX){num++;document.getElementById("exp").value=num;my.base=num;restart();play();}}
function drawBalls(n){let xPos=320;let yPos=200;n=Math.min(n,200);for(i=0;i<n;i++){g.beginPath();g.fillStyle="#4488ff";g.arc(xPos,yPos,5,0,Math.PI*2,true);g.closePath();g.fill();xPos+=12;if(xPos>430){xPos=320;yPos-=12;}}}