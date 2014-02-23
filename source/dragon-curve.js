var matrix = {
   mult: function ( m, v ) {
      return [ m[0][0] * v[0] + m[0][1] * v[1],
               m[1][0] * v[0] + m[1][1] * v[1] ];
   },

   minus: function ( a, b ) {
      return [ a[0]-b[0], a[1]-b[1] ];
   },

   plus: function ( a, b ) {
      return [ a[0]+b[0], a[1]+b[1] ];
   }
};

function drawPath(from, to) {
  c.beginPath();
  c.moveTo(from[0], from[1]);
  c.lineTo(to[0], to[1]);
  c.stroke();
}

function rand(high) {
  return Math.floor(Math.random() * high + 1) - 1;
}

var first = [500, 350];
var secund = [500, 300];

function calc(p1, p2, dir) {
  var left  = [[ .5,-.5 ],
               [ .5, .5 ]];

  var right = [[ .5, .5 ],
               [-.5, .5 ]];

  return matrix.plus(p1, matrix.mult(dir ? left : right, matrix.minus(p2, p1)));
}

var p1 = first;
var p3 = secund;


function loop(p1, p2, depth) {

  // drawPath({x: rand(50), y: rand(50)}, {x: rand(a.width), y: rand(a.height)});
  var p3 = calc(p1, p2, rand(10) > 5);
  drawPath(p3, p2);
  drawPath(p3, p1);

  if (depth < 10) {
    window.requestAnimationFrame(function () {
      loop(p3, p1, depth++);
      loop(p3, p2, depth++);
    }, a);
  }
}

loop(first, secund, 0);
