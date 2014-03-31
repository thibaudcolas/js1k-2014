var timer = 0;
var mouseDown = false;
var positions = [];
var X = Y = x = y = 0;

var colors = [
  '#A2659D',
  '#76B0C2',
  '#C7D38D',
  '#F09D61',
  '#EC5954'
];


  // create radial gradient
  var grd = c.createRadialGradient(0, 0, 0, 0, 0, a.width + a.height);
  grd.addColorStop(0, colors[1]);
  grd.addColorStop(0.5, '#1E80C2');
  grd.addColorStop(1, 'transparent');

onmouseup = function (e) {
  mouseDown = false;
  e.preventDefault();
};

onmousedown = function (e) {
  mouseDown = true;
  e.preventDefault();
};

onmousemove = function (e) {
  if (mouseDown) {
    x = e.pageX;
    y = e.pageY;
    // Curve smoothing.
    X = X + (x - X) / 30;
    Y += (y - Y) / 30;
    positions.push([X, Y]);
  }
};

function loop() {
  timer++;
  c.globalAlpha = 0.8 / (1 + positions.length / 100);
  //c.globalCompositeOperation = 'xor';

  background();

  drawLine();


  window.requestAnimationFrame(loop, a);
}

function background() {

  c.fillStyle = grd;
  c.arc(0, 0, a.width + a.height, 0, 2 * Math.PI);
  c.fill();
}

function drawLine() {
  if (timer % 2 === 0) {
    positions.shift();
  }

  c.lineWidth = 5;
  c.strokeStyle = colors[4];
  for (var i= 0; i < positions.length - 1; i++) {
    c.beginPath();
    c.moveTo(positions[i][0], positions[i][1]);
    c.lineTo(positions[i+1][0], positions[i+1][1]);
    c.stroke();
    c.closePath();
  }
}

loop();
