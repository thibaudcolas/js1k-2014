// Timer and smoothTimer;
var t = s = 0;
var positions = [];
// Current positions and points.
var X = Y = x = y = p = 0;
var w = a.width;
var h = a.height;

var M = Math;

for (e in c) c[e[0]+e[2]+(e[6]||'')] = c[e];

var circles = [];

// create radial gradient
var grd = c.ceR(0, 0, 0, 0, 0, w + h);
grd.addColorStop(0, '#1E80C2');
grd.addColorStop(1, 'transparent');

c.globalAlpha = 0.7;

function rand(low, high) {
  high -= low - 1;
  return M.floor(M.random() * high + low);
}

onmousemove = function (e) {
  x = e.pageX;
  y = e.pageY;
};

function loop() {
  t++;
  s = t / 9;

  X += (x - X) / 20;
  Y += (y - Y) / 20;
  if (positions.length < 50) {
    positions.push([X, Y]);
  }

  c.fillStyle = grd;
  c.arc(0, 0, w + h, 0, 7);
  c.fl();

  drawLine();

  if (t % 99 == 0 && circles.length < 9) {
    circles.push([rand(9, w), rand(9, h), rand (9, 50)]);
  }

  for (var i = 0; i < circles.length; i++) {
    if (M.sqrt((X-circles[i][0])*(X-circles[i][0]) + (Y-circles[i][1])*(Y-circles[i][1])) < circles[i][2]) {
      circles.splice(i, 1);
      p++;
    }
  }

  drawCircles();

  c.font = '30pt';
  c.fillStyle = '#fff';
  c.flx(p, w - 50, h - 30);

  window.requestAnimationFrame(loop, a);
}

function drawCircles() {
  for (var i= 0; i < circles.length; i++) {
    c.strokeStyle = 'tomato';
    c.bga();
    c.arc(M.cos(s) * 3 + circles[i][0], M.sin(s) * 3 + circles[i][1], circles[i][2], 0, 7);
    c.coa();
    c.sr();
  }
}

function drawLine() {
  if (t % 2 == 0) {
    positions.shift();
  }

  c.lineWidth = 5;
  c.strokeStyle = '#EC5954';
  for (var i= 0; i < positions.length - 1; i++) {
    c.bga();
    c.mv(positions[i][0], M.cos(-i + s) * 2 - (positions[i][1]-positions[i][1])/9 + positions[i][1] - 9);
    c.ln(positions[i+1][0], M.cos(-i + s) * 2 - (positions[i+1][1]-positions[i][1])/9 + positions[i+1][1] - 9);
    c.sr();
    c.coa();
  }
}

loop();

