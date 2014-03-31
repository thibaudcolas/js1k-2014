var timer = smoothTimer = 0;
var positions = [];
var X = Y = x = y = score = 0;
var w = w;
var h = a.height;

var M = Math;

for (e in c) c[e[0]+e[2]+(e[6]||'')] = c[e];

var circles = [];

// create radial gradient
var grd = c.ceR(0, 0, 0, 0, 0, w + a.height);
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
  timer++;
  smoothTimer = timer / 9;

  X += (x - X) / 20;
  Y += (y - Y) / 20;
  if (positions.length < 50) {
    positions.push([X, Y]);
  }

  drawBackground();

  drawLine();

  if (timer % 99 == 0 && circles.length < 9) {
    circles.push([rand(9, w), rand(9, a.height), rand (9, 50)]);
  }

  for (var i = 0; i < circles.length; i++) {
    if (M.sqrt((X-circles[i][0])*(X-circles[i][0]) + (Y-circles[i][1])*(Y-circles[i][1])) < circles[i][2]) {
      circles.splice(i, 1);
      score++;
    }
  }

  drawCircles();

  drawScore();

  window.requestAnimationFrame(loop, a);
}

function drawBackground() {
  c.fillStyle = grd;
  c.arc(0, 0, w + a.height, 0, 2 * M.PI);
  c.fl();
}

function drawScore() {
  c.font = '30pt';
  c.fillStyle = '#fff';
  c.flx(score, w - 50, a.height - 30);
}

function drawCircles() {
  for (var i= 0; i < circles.length; i++) {
    c.strokeStyle = 'tomato';
    c.bga();
    c.arc(M.cos(smoothTimer) * 3 + circles[i][0], M.sin(smoothTimer) * 3 + circles[i][1], circles[i][2], 0, M.PI*2, true);
    c.coa();
    c.sr();
  }
}

function drawLine() {
  if (timer % 2 == 0) {
    positions.shift();
  }

  c.lineWidth = 5;
  c.strokeStyle = '#EC5954';
  for (var i= 0; i < positions.length - 1; i++) {
    c.bga();
    c.mv(positions[i][0], M.cos(-i + smoothTimer) * 2 - (positions[i][1]-positions[i][1])/9 + positions[i][1] - 9);
    c.ln(positions[i+1][0], M.cos(-i + smoothTimer) * 2 - (positions[i+1][1]-positions[i][1])/9 + positions[i+1][1] - 9);
    c.sr();
    c.coa();
  }
}

loop();

