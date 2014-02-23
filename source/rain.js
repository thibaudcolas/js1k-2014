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
  //drawPath({x: rand(50), y: rand(50)}, {x: rand(a.width), y: rand(a.height)});
  updateRain();
  updateRoof();

  c.clearRect(0, 0, a.width, a.height);
  drawRain();
  drawRoof();

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
  if (mouseDown) {
    roof.push([e.clientX, e.clientY]);
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
  c.strokeStyle = 'blue';
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
  c.strokeStyle = 'brown';
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
  rainStart(),
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
a.style.backgroundColor='#112';

loop();
