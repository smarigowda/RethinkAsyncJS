function add(x, y) {
  return x + y;
}

let thunk = function() {
  return add(10, 12);
}

let result = thunk();
console.log(result);

