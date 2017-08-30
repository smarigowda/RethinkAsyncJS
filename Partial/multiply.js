let multiply = function(x, y) {
  debugger;
  return x * y;
}

let partial = function(fn) {
  // drop the function from argument
  // and capture the rest of the arguments in a closure
  let args = [].slice.call(arguments, 1);
  // return a new function with fixed arguments
  return function() {
    let combinedArgs = args.concat([].slice.call(arguments));
    debugger;
    // call the function with fixed and new arguments
    return fn.apply(this, combinedArgs);
  }
}

let double = partial(multiply, 2);
debugger;
let result = double(8);
console.log(result);
debugger;