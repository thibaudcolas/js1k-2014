var d=0,e=[],f=Y=x=y=0,g=Math,h=0,k=[],l=c.createRadialGradient(0,0,0,0,0,a.width+a.height);l.addColorStop(0,"#76B0C2");l.addColorStop(0.2,"#1E80C2");l.addColorStop(1,"transparent");c.globalAlpha=0.7;function m(b,p){return g.floor(g.random()*(p-(b-1))+b)}onmousemove=function(b){x=b.pageX;y=b.pageY};
function n(){d++;f+=(x-f)/20;Y+=(y-Y)/20;50>e.length&&e.push([f,Y]);c.fillStyle=l;c.arc(0,0,a.width+a.height,0,2*g.PI);c.fill();0===d%2&&e.shift();c.lineWidth=5;c.strokeStyle="#EC5954";for(var b=0;b<e.length-1;b++)c.beginPath(),c.moveTo(e[b][0],2*g.cos(-b+d/12)-(e[b][1]-e[b][1])/9+e[b][1]-9),c.lineTo(e[b+1][0],2*g.cos(-b+d/12)-(e[b+1][1]-e[b][1])/9+e[b+1][1]-9),c.stroke(),c.closePath();0===d%100&&10>k.length&&k.push([m(9,a.width),m(9,a.height),m(10,50)]);for(b=0;b<k.length;b++)g.sqrt((f-k[b][0])*
(f-k[b][0])+(Y-k[b][1])*(Y-k[b][1]))<k[b][2]&&(k.splice(b,1),h++);for(b=0;b<k.length;b++)c.strokeStyle="tomato",c.beginPath(),c.arc(3*g.cos(d/12)+k[b][0],3*g.sin(d/12)+k[b][1],k[b][2],0,2*g.PI,!0),c.closePath(),c.stroke();c.font="30pt Calibri";c.fillStyle="#fff";c.fillText(h,a.width-50,a.height-30);window.requestAnimationFrame(n,a)}n();
