var timer = 0;
var mouseDown = false;
var positions = [];
var X = Y = x = y = 0;

var M = Math;

var score = 0;

var circles = [];

// create radial gradient
var grd = c.createRadialGradient(0, 0, 0, 0, 0, a.width + a.height);
grd.addColorStop(0, '#76B0C2');
grd.addColorStop(.2, '#1E80C2');
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

  X = X + (x - X) / 20;
  Y += (y - Y) / 20;
  if (positions.length < 50) {
    positions.push([X, Y]);
  }

  drawBackground();

  drawLine();

  if (timer % 100 === 0 && circles.length < 10) {
    circles.push([rand(9, a.width), rand(9, a.height), rand (10, 50)]);
  }

  for (var i = 0; i < circles.length; i++) {
    if (M.sqrt((X-circles[i][0])*(X-circles[i][0]) + (Y-circles[i][1])*(Y-circles[i][1])) < circles[i][2]) {
      circles.splice(i, 1);
      score+=i;
    }
  }

  drawCircles();

  window.requestAnimationFrame(loop, a);
}

function drawBackground() {
  c.fillStyle = grd;
  c.arc(0, 0, a.width + a.height, 0, 2 * M.PI);
  c.fill();
}

function drawCircles() {
  for (var i= 0; i < circles.length; i++) {
    c.strokeStyle = 'tomato';
    c.beginPath();
    c.arc(M.cos(timer/12) * 3 + circles[i][0], M.sin(timer/12) * 3 + circles[i][1], circles[i][2], 0, M.PI*2, true);
    c.closePath();
    c.stroke();
  }
}

function drawLine() {
  if (timer % 2 === 0) {
    positions.shift();
  }

  c.lineWidth = 5;
  c.strokeStyle = '#EC5954';
  for (var i= 0; i < positions.length - 1; i++) {
    c.beginPath();
    c.moveTo(positions[i][0], M.cos(-i + timer/12) * 2 - (positions[i][1]-positions[i][1])/9 + positions[i][1] - 9);
    c.lineTo(positions[i+1][0], M.cos(-i + timer/12) * 2 - (positions[i+1][1]-positions[i][1])/9 + positions[i+1][1] - 9);
    c.stroke();
    c.closePath();
  }
}

loop();

