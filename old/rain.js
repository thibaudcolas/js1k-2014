t = x = y = X = Y = 0;

function drawPath(from, to) {
  c.lineWidth = 20;
  c.beginPath();
  c.moveTo(from[0], from[1]);
  c.lineTo(to[0], to[1]);
  c.stroke();
  c.closePath();
}

function rand(low, high) {
  high -= low - 1;
  return Math.floor(Math.random() * high + low);
}

function loop(p1, p2, depth) {
  t++;
  updateRain();
  updateRoof();

  c.clearRect(0, 0, a.width, a.height);

  c.beginPath();
  var rad = c.createRadialGradient(0, 0, 1, 0, 0, 999);
  rad.addColorStop(0, '#811');
  rad.addColorStop(1, 'transparent');
  c.fillStyle = rad;
  c.arc(0, 0, a.width + a.height, 0, Math.PI*2, false);
  c.fill();

  // c.beginPath();
  // var rad = c.createRadialGradient(X, Y, 1, X, Y, 50);
  // rad.addColorStop(0, 'tomato');
  // rad.addColorStop(1, 'transparent');
  // c.fillStyle = rad;
  // c.arc(X, Y, 30, 0, Math.PI*2, false);
  // c.fill();


  //drawRain();
  //drawRoof();

  window.requestAnimationFrame(loop, a);
}

onmouseup = function (e) {
  mouseDown = false;
  e.preventDefault();
};

onmousedown = function (e) {
  mouseDown = true;
  e.preventDefault();
};

onmousemove = function (e) {
  x = e.clientX;
  y = e.clientY;
  X += (x-X)/30;
  Y += (y-Y)/30;
  if (mouseDown) {
    roof.push([X, Y, rand(0, 9) > 7]);
  }
};

function rainStart() {
  return rand(0, a.width);
}

function updateRain() {
  rain.shift();
  rain.push(rainStart());
}

function drawRain() {
  c.lineWidth = 1;
  c.strokeStyle = '#BEF';
  rain.forEach(function (r) {
    c.beginPath();
    c.moveTo(r, 0);
    c.lineTo(r, a.height);
    c.stroke();
    c.closePath();
  });
}

function updateRoof() {
  timer++;
  if (timer % 2 == 0) {
    roof.shift();
  }
}

function drawRoof() {
  c.lineWidth = 3;
  c.strokeStyle = 'red';
  for (var i= 0; i < roof.length - 1; i++) {
    c.beginPath();
    c.moveTo(roof[i][0], roof[i][1]);
    c.lineTo(roof[i+1][0], roof[i+1][1]);
    c.stroke();
    c.closePath();
  };
}

var rain = [
  rainStart(),
  rainStart(),
  rainStart(),
  rainStart(),
  rainStart(),
  rainStart(),
  rainStart(),
  rainStart()
];

var roof = [
];

var timer = 0;

lastPosition = [10, 10];
c.lineCap = 'round';
mouseDown = false;
c.globalAlpha = .8/3;
a.style.backgroundColor='#BEF';

loop();
