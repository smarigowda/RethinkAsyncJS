function makeThunk(fn) {
  // console.log(arguments);
  var args = [].slice.call(arguments, 1);
  // console.log(args);
  return function(cb) {
    args.push(cb);
    fn.apply(null, args);
  }
}

function addAsync(x, y, cb) {
  setTimeout(function() {
    cb(x+y);
  }, 4000);
}

let thunk1 = makeThunk(addAsync, 10, 12);

thunk1(function(result) {
  console.log(result);
});

