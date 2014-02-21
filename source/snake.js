function equalCoordinates(c1, c2) {
  return c1[0] == c2[0] && c1[1] == c2[1];
};

var score;
var timeout;
var frameInterval;

var width = a.width;
var height= a.height;
var block = 10;
var widthInBlocks = width / block;
var heightInBlocks = height / block;

var snakePos = [];
var direction = 'r';
var nextDirection = direction;

var applePos = [6, 6];

var keysToDirections = {
  37: 'l',
  38: 'u',
  39: 'r',
  40: 'd'
};

var allowedDirections = {
  l: ['u', 'd'],
  r: ['u', 'd'],
  u: ['l', 'r'],
  d: ['l', 'r'],
};

function init() {
  direction = nextDirection = 'r';
  snakePos = [[6, 4], [5, 4], [4, 4]];

  score = 0;
  frameInterval = 99;

  // command();

  document.onkeydown = function (evt) {
    var key = evt.which;
    var desiredDirection = keysToDirections[key];

    if (desiredDirection) {
      // setDirection(direction);
      if (allowedDirections[direction].indexOf(desiredDirection) !== -1) {
        nextDirection = desiredDirection;
      }
      evt.preventDefault();
    }
    else if (key === 32) {
      clearTimeout(timeout);
    init();
    }
  };

  loop();
}

function loop() {
  // Sets all pixels to black w/ 0 opacity.
  c.clearRect(0, 0, width, height);
  // advance();
  var nextPosition = snakePos[0].slice();
  direction = nextDirection;

  switch (direction) {
    case 'l':
      nextPosition[0]--;
      break;
    case 'u':
      nextPosition[1]--;
      break;
    case 'r':
      nextPosition[0]++;
      break;
    case 'd':
      nextPosition[1]++;
      break;
  }

  snakePos.unshift(nextPosition);
  // isEatingApple(head)
  if (equalCoordinates(snakePos[0], applePos)) {
    // move([snakePos]);
    applePos = [random(widthInBlocks), random(heightInBlocks)];
    frameInterval *= 0.95;
    score++;
  }
  else {
    snakePos.pop();
  }
  // drawSnake(c);
  c.fillStyle = 'tomato';
  snakePos.forEach(function (p) {
    c.fillRect(block * p[0], block * p[1], block, block);
  });
  // drawScore(c, score);
  c.fillText(score, width - 9, height - 9);
    // drawApple(c);
  c.fillStyle = 'lime';
  c.beginPath();
  var radius = block / 2;
  // x, y, radius, startangle, endangle (radians), clockwise.
  c.arc(applePos[0] * block + radius, applePos[1] * block + radius, radius, 0, Math.PI * 2, 1);
  c.fill();

  // checkCollision()
  var head = snakePos[0];
  var snakeX = head[0];
  var snakeY = head[1];

  // checkCoordinateInArray
  var snakeCollision = 0;
  snakePos.slice(1).forEach(function (item) {

    if (equalCoordinates(head, item)) {
      snakeCollision = 1;
    }
  });

  if (!(!snakeX || snakeX > widthInBlocks || !snakeY || snakeY > heightInBlocks || snakeCollision)) {
    timeout = setTimeout(loop, frameInterval);
  }
}

function random(high) {
  return Math.floor(Math.random() * high) - 1;
}

init();
