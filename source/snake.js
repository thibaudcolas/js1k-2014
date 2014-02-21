function equalCoordinates(c1, c2) {
  return c1[0] === c2[0] && c1[1] === c2[1];
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
  frameInterval = 100;

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
    applePos = [random(1, widthInBlocks - 2), random(1, heightInBlocks - 2)];
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
  // drawApple(c);
  c.fillStyle = 'lime';
  c.beginPath();
  var radius = block / 2;
  // x, y, radius, startangle, endangle (radians), clockwise.
  c.arc(applePos[0] * block + radius, applePos[1] * block + radius, radius, 0, Math.PI * 2, true);
  c.fill();
  // drawScore(c, score);
  c.font = 'bold 20px serif';
  c.fillStyle = 'red';
  c.fillText(score, width - 20, height - 20);

  // checkCollision()
  var head = snakePos[0];
  var snakeX = head[0];
  var snakeY = head[1];
  var outsideHorizontalBounds = !snakeX || snakeX > widthInBlocks;
  var outsideVerticalBounds = !snakeY || snakeY > heightInBlocks;

  // checkCoordinateInArray
  var snakeCollision = false;
  snakePos.slice(1).forEach(function (item) {

    if (equalCoordinates(head, item)) {
      snakeCollision = true;
    }
  });

  if (outsideHorizontalBounds || outsideVerticalBounds || snakeCollision) {
  }
  else {
    timeout = setTimeout(loop, frameInterval);
  }
}

function random(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

init();
