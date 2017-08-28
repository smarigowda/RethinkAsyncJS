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

// thunk1(function(result) {
//   console.log(result);
// });

function getData(x, cb) {
  return cb(x);
}

debugger;

let get10 = makeThunk(getData, 10);
let get30 = makeThunk(getData, 30);

get10(function(d) {
  // console.log(d);
  let num1 = d + 1;
  get30(function(d) {
    let num2 = d + 1;
    let getAnswer = makeThunk(getData, `meaing of life = ${num1 + num2}`);
    getAnswer(function(d) {
      debugger;
      console.log(d);
    });
  });
});


