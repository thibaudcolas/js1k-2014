var g=s=0,h=[],k=Y=x=y=p=C=0,l=a.width,m=a.height,n=Math;for(e in c)c[e[0]+e[2]+(e[6]||"")]=c[e];var q=[],r=c.ceR(0,0,0,0,0,l+m);r.addColorStop(0,"#1E80C2");r.addColorStop(1,"transparent");function t(f){return n.random()*(f-40)+20}onmousemove=function(f){x=f.pageX;y=f.pageY};
function u(){with(c){g++;s=g/9;k+=(x-k)/20;Y+=(y-Y)/20;50>h.length&&h.push([k,Y]);globalAlpha=0.7;fillStyle=r;arc(0,0,l+m,0,7);fl();0==g%2&&h.shift();lineWidth=5;strokeStyle="hsl("+t(h.length)+",90%,50%)";for(var f=0;f<h.length-1;f++)bga(),mv(h[f][0],2*n.cos(-f+s)-(h[f][1]-h[f][1])/9+h[f][1]-9),ln(h[f+1][0],2*n.cos(-f+s)-(h[f+1][1]-h[f][1])/9+h[f+1][1]-9),sr(),coa();0==g%50&&q.push([t(l),t(m),t(80),t(200)]);for(f=0;f<q.length;f++)C=q[f],strokeStyle=50<C[2]?"black":"hsl("+C[3]+",90%,50%)",bga(),arc(3*
n.cos(s)+C[0],3*n.sin(s)+C[1],C[2],0,7),coa(),sr(),n.sqrt((k-C[0])*(k-C[0])+(Y-C[1])*(Y-C[1]))<C[2]&&(q.splice(f,1),p++,50<C[2]&&(p=0,h=[]));font="30px arial";fillStyle="#fff";flx(p,20,40)}window.requestAnimationFrame(u)}u();
